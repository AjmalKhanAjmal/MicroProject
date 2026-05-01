from langgraph.types import Command
from langgraph.checkpoint.memory import MemorySaver
from langgraph.prebuilt import tools_condition, ToolNode
from langgraph.types import interrupt
from langchain.chat_models import init_chat_model
from langchain.messages import AnyMessage, HumanMessage, SystemMessage
from langchain_community.tools import TavilySearchResults
from langchain_tavily import TavilySearch
from typing_extensions import TypedDict, Annotated
from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages

import operator
from dotenv import load_dotenv
import os

# ----------------------------
# Load environment variables
# ----------------------------
load_dotenv()
groq_api_key = os.environ["GROQ_API_KEY"]

tavily_api_key = os.environ["TAVILY_API_KEY"]


# ----------------------------
# Initialize LLM
# ----------------------------
llm = init_chat_model("llama-3.1-8b-instant", model_provider="groq", temperature=0)


# ----------------------------
# State definition
# ----------------------------
class State(TypedDict):
    messages: Annotated[list, add_messages]


# ----------------------------
# Human interrupt tool
# ----------------------------
def human_assistant(query: str) -> str:
    """Request assistant from a human"""
    #    print("human_assistant : ", query)
    human_response = interrupt({"query": query})
    return human_response["data"]


# ----------------------------
# Tavily Search Tool
# ----------------------------
search_tool = TavilySearch(max_results=2, tavily_api_key=tavily_api_key)

tools = [search_tool, human_assistant]

# Bind tools to LLM
model_with_tools = llm.bind_tools(tools)


# ----------------------------
# Chatbot node
# ----------------------------
def chatbot(state: State, config):
    message = model_with_tools.invoke(state["messages"])
    # print(config)
    return {"messages": [message]}


# builder.add_edge("tools", "chatbot")

agent_builder = StateGraph(State)

# too_node = ToolNode(tools=tools)  # why  this error getting
# agent_builder.add_node("too_node", too_node)
agent_builder.add_node("tools", ToolNode(tools=tools))

# Add nodes
agent_builder.add_node("chatbot", chatbot)


agent_builder.add_conditional_edges("chatbot", tools_condition)

agent_builder.add_edge("tools", "chatbot")

agent_builder.add_edge(START, "chatbot")

memory = MemorySaver()  # why  this require

graph = agent_builder.compile(checkpointer=memory)


user_input = "I need some expert guidence for building an AI agent. Could you request assistance for me?"
config = {"configurable": {"thread_id": "1"}}


events = graph.stream(
    {"messages": [HumanMessage(content=user_input)]},
    config=config,
    stream_mode="values",
    # stream_mode="updates",
)

for event in events:
    # print("events : ", event)
    if "messages" in event:
        event["messages"][-1].pretty_print()

# print("state : ", graph.get_state(config))


human_response = (
    "We, the experts are here to help! we'd recommend you check out Langraph to build your agent."
    "It's much more reliable and extensible than building a simple autonomous agents from scratch."
)
events = graph.stream(
    Command(resume={"data": human_response}),
    config=config,
    stream_mode="values",
)
for event in events:
    if "messages" in event:
        event["messages"][-1].pretty_print()


print("user_input : ", user_input)
print("human_response : ", human_response)
