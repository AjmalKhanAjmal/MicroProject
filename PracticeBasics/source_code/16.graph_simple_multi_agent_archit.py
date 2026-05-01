from langchain_core.messages import SystemMessage, HumanMessage
from langchain_community.tools import tool, TavilySearchResults
from langchain.chat_models import init_chat_model
from langgraph.graph import StateGraph, END, MessagesState
from typing_extensions import TypedDict
from dotenv import load_dotenv
import os

load_dotenv()
groq_api_key = os.environ["GROQ_API_KEY"]

tavily_api_key = os.environ["TAVILY_API_KEY"]


class AgentState(MessagesState):
    next_agent: str


@tool
def search_web(query: str):
    """Search the web for information."""
    search = TavilySearchResults(max_results=3)
    results = search.invoke(query)
    return str(results)


@tool
def write_summary(content: str) -> str:
    """Write a summary of the providedd content"""
    summary = f"summary of findings \n\n{content[:500]}..."
    return summary


# ----------------------------
# Initialize LLM
# ----------------------------
llm = init_chat_model("llama-3.1-8b-instant", model_provider="groq", temperature=0)


# Define agent functions (simpler approach)
def researcher_agent(state: AgentState):
    """Researcher agent that searches for information"""

    messages = state["messages"]

    # Add system message for context
    system_msg = SystemMessage(
        content="You are a research assistant. Use the search_web tool to find information"
    )

    # Call LLM with tools
    researcher_llm = llm.bind_tools([search_web])
    response = researcher_llm.invoke([system_msg] + messages)

    # Return the response and route to writer
    return {"messages": [response], "next_agent": "writer"}


def writer_agent(state: AgentState):
    """Writer agent that creates summaries"""

    messages = state["messages"]

    # Add system message
    system_msg = SystemMessage(
        content="You are a technical writer. Review the conversation and create a clear, concise summary of the findings"
    )

    # Simple completion without tools
    response = llm.invoke([system_msg] + messages)

    return {"messages": [response], "next_agent": "end"}


# Build graph
workflow = StateGraph(MessagesState)

# Add nodes
workflow.add_node("researcher", researcher_agent)
workflow.add_node("writer", writer_agent)

# Define flow
workflow.set_entry_point("researcher")
workflow.add_edge("researcher", "writer")
workflow.add_edge("writer", END)

final_workflow = workflow.compile()
# print(final_workflow)

# return workflow.compile()


response = final_workflow.invoke(
    {"messages": "Research about the usecase of agentic ai in business"}
)

# response = final_workflow.invoke({"messages": "What is today's IPL match?"})

print(response["messages"][-1].content)
