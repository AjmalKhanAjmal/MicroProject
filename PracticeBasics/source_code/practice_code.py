from langgraph.graph import MessagesState, StateGraph, END
from langchain_core.messages import SystemMessage, HumanMessage
from langchain_community.tools import tool
from langchain_tavily import TavilySearch
from langgraph.prebuilt import tools_condition, ToolNode


from dotenv import load_dotenv
import os
from langchain.chat_models import init_chat_model

load_dotenv()
groq_api_key = os.environ["GROQ_API_KEY"]

# tavily_api_key = os.environ["TAVILY_API_KEY"]


class AgentState(MessagesState):
    next_agent: str


llm = init_chat_model(
    model="llama-3.1-8b-instant", model_provider="groq", temperature=0
)


def search_web(query: str):
    # print("query :", query)
    """Search the web for the answer to the query."""
    talvily_search = TavilySearch(max_results=1)
    reponse = talvily_search.invoke(query)
    return reponse


tools = [search_web]


def researcher_agent(state: AgentState):
    """Researcher agent that searches for information"""
    messages = state["messages"]
    system_prompt = SystemMessage(
        content="you are a research assistant. Use the search_web tool to find information"
    )
    # llm_with_tools = llm.bind_tools([search_web])

    # response = llm_with_tools.invoke([system_prompt] + messages)
    llm_with_tools = llm.bind_tools(tools)

    response = llm_with_tools.invoke([system_prompt] + messages)
    # 🔥 HANDLE TOOL CALL
    # if response.tool_calls:
    #     tool_call = response.tool_calls[0]
    #     tool_name = tool_call["name"]
    #     tool_args = tool_call["args"]

    #     if tool_name == "search_web":
    #         tool_result = search_web(**tool_args)

    #         # send tool result as message
    #         return {
    #             "messages": [HumanMessage(content=str(tool_result))],
    #             "next_agent": "writer",
    #         }

    return {"messages": [response], "next_agent": "writer"}


def writer_agent(state: AgentState):
    messages = state["messages"]
    print("messages : ", messages)

    system_msg = SystemMessage(
        content="You are a technical writer. Review the conversation and create a clear, concise summary of the findings"
    )

    # print("messages : ", messages)

    response = llm.invoke([system_msg] + messages)

    return {"messages": [response], "next_agent": "end"}


workflow = StateGraph(AgentState)
workflow.add_node("researcher", researcher_agent)
workflow.add_node("writer", writer_agent)
workflow.add_node("tools", ToolNode(tools=tools))


# workflow.add_edge("researcher", "writer")
workflow.add_conditional_edges("researcher", tools_condition)

workflow.add_edge("tools", "writer")

workflow.add_edge("writer", END)
workflow.set_entry_point("researcher")

graph = workflow.compile()

response = graph.invoke(
    {"messages": [HumanMessage(content="What is today's IPL match?")]}
)

# response = graph.invoke(
#     {"messages": "Research about the usecase of agentic ai in business"}
# )


# print("response : ", response)
print(response["messages"][-1].content)
