from dotenv import load_dotenv
import os
from langchain_groq import ChatGroq

from langchain.tools import tool
from langchain.agents import create_agent

from langchain.agents.middleware import wrap_model_call, ModelRequest, ModelResponse
from typing import Callable


# Load .env file
load_dotenv()
api_key = os.environ["GROQ_API_KEY"]
# llm = ChatGroq(api_key=os.environ["GROQ_API_KEY"], model="llama-3.1-8b-instant")
# response = llm.invoke("What is AI?")
# print(response)


model = ChatGroq(
    api_key=api_key,
    model="llama-3.1-8b-instant",
    temperature=1.0,
    max_tokens=50,
    # reasoning_format="parsed",
    timeout=None,
    max_retries=2,
    # other params...
)


# @tool
# def search(query: str) -> str:
#     """Search for information."""
#     return f"Results for: {query}"


# @tool
# def get_weather(location: str) -> str:
#     """Get weather information for a location."""
#     return f"Weather in {location}: Sunny, 72°F"


# agent = create_agent(model, tools=[search, get_weather])

# print(
#     agent.invoke(
#         {"messages": [{"role": "user", "content": "What is the weather in New York?"}]}
#     )
# )


# response = agent.invoke(
#     {
#         "messages": [
#             {"role": "user", "content": "Search for information about copper bottle"}
#         ]
#     }
# )
# print(response)

# print(agent.invoke({"messages": [{"role": "user", "content": "Search for AI trends"}]}))


@tool
def public_search(query: str) -> str:
    """Search for information."""
    return f"Results for: {query}"


@tool
def private_search(location: str) -> str:
    """Get weather information for a location."""
    return f"Weather in {location}: Sunny, 72°F"


@wrap_model_call
def state_based_tools(
    request: ModelRequest, handler: Callable[[ModelRequest], ModelResponse]
) -> ModelResponse:
    """Filter tools based on conversation State."""
    # Read from State: check if user has authenticated
    state = request.state
    is_authenticated = state.get("authenticated", False)
    message_count = len(state["messages"])

    # Only enable sensitive tools after authentication
    if not is_authenticated:
        tools = [t for t in request.tools if t.name.startswith("public_")]
        request = request.override(tools=tools)
    elif message_count < 5:
        # Limit tools early in conversation
        tools = [t for t in request.tools if t.name != "advanced_search"]
        request = request.override(tools=tools)

    return handler(request)


agent = create_agent(
    model="gpt-4.1",
    tools=[public_search, private_search],
    middleware=[state_based_tools],
)


print(agent.invoke({"messages": ["Search for information about copper bottle"]}))
