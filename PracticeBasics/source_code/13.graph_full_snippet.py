from langchain.tools import tool
from langchain.chat_models import init_chat_model

from langchain.messages import AnyMessage
from typing_extensions import TypedDict, Annotated
import operator


from langchain.messages import SystemMessage

from langchain.messages import ToolMessage


from typing import Literal
from langgraph.graph import StateGraph, START, END

from IPython.display import Image, display
from langchain.messages import HumanMessage

from dotenv import load_dotenv
import os


# Step 1: Define tools and model


# Load .env file
load_dotenv()
api_key = os.environ["GROQ_API_KEY"]

model = init_chat_model(
    "llama-3.1-8b-instant",
    model_provider="groq",
    temperature=0,
    max_tokens=200,
)


# Define tools
@tool
def multiply(a: int, b: int) -> int:
    """Multiply `a` and `b`.

    Args:
        a: First int
        b: Second int
    """
    return a * b


@tool
def add(a: int, b: int) -> int:
    """Adds `a` and `b`.

    Args:
        a: First int
        b: Second int
    """
    return a + b


@tool
def divide(a: int, b: int) -> float:
    """Divide `a` and `b`.

    Args:
        a: First int
        b: Second int
    """
    return a / b


# Augment the LLM with tools
tools = [add, multiply, divide]
tools_by_name = {tool.name: tool for tool in tools}

# print("tool by name : ", tools_by_name)
model_with_tools = model.bind_tools(tools)


# print("model with tools : ", model_with_tools)

# Step 2: Define state


class MessagesState(TypedDict):
    messages: Annotated[list[AnyMessage], operator.add]
    llm_calls: int


# Step 3: Define model node


def llm_call(state: dict):
    """LLM decides whether to call a tool or not"""

    data = {
        "messages": [
            model_with_tools.invoke(
                [
                    SystemMessage(
                        content="You are a helpful assistant tasked with performing arithmetic on a set of inputs."
                    )
                ]
                + state["messages"]
            )
        ],
        "llm_calls": state.get("llm_calls", 0) + 1,
    }

    # print("NEW:", data["messages"])
    return data


# Step 4: Define tool node


def tool_node(state: dict):
    """Performs the tool call"""

    result = []
    for tool_call in state["messages"][-1].tool_calls:
        tool = tools_by_name[tool_call["name"]]
        observation = tool.invoke(tool_call["args"])
        result.append(ToolMessage(content=observation, tool_call_id=tool_call["id"]))
    data = {"messages": result}
    # print("tool_node data : ", data)
    return data


# Step 5: Define logic to determine whether to end


# Conditional edge function to route to the tool node or end based upon whether the LLM made a tool call
def should_continue(state: MessagesState) -> Literal["tool_node", END]:
    """Decide if we should continue the loop or stop based upon whether the LLM made a tool call"""

    messages = state["messages"]
    last_message = messages[-1]

    # If the LLM makes a tool call, then perform an action
    if last_message.tool_calls:
        # print("should_continue : ", messages)
        return "tool_node"

    # Otherwise, we stop (reply to the user)
    print("END")
    return END


# Step 6: Build agent

# Build workflow
agent_builder = StateGraph(MessagesState)

# Add nodes
agent_builder.add_node("llm_call", llm_call)
agent_builder.add_node("tool_node", tool_node)

# Add edges to connect nodes
agent_builder.add_edge(START, "llm_call")
agent_builder.add_conditional_edges("llm_call", should_continue, ["tool_node", END])
agent_builder.add_edge("tool_node", "llm_call")

# Compile the agent
agent = agent_builder.compile()

# Show the agent
# display(Image(agent.get_graph(xray=True).draw_mermaid_png()))

img = agent.get_graph().draw_mermaid_png()

with open("graph.png", "wb") as f:
    f.write(img)

# Invoke

messages = [HumanMessage(content="Add 3 and 4.")]
messages = agent.invoke({"messages": messages})
for m in messages["messages"]:
    # print(m)
    m.pretty_print()
