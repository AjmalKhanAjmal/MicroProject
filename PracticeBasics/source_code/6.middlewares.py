from langchain_core.messages import HumanMessage
from dotenv import load_dotenv
import os
from langchain_groq import ChatGroq
from langchain.agents import create_agent
from langgraph.checkpoint.memory import InMemorySaver
from langchain.agents.middleware import SummarizationMiddleware
from langchain.tools import tool


# Load .env file
load_dotenv()
api_key = os.environ["GROQ_API_KEY"]


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


# agent = create_agent(
#     model=model,
#     checkpointer=InMemorySaver(),
#     middleware=[
#         SummarizationMiddleware(
#             model=model, trigger=("messages", 10), keep=("messages", 4)
#         )
#     ],
# )


# config = {"configurable": {"thread_id": "thread_1"}}


# questions = [
#     "What is 2 + 2?",
#     "What is 3 + 3?",
#     "What is 4 - 4?",
#     "What is 5 - 5?",
#     "What is 6 + 6?",
#     "What is 7 / 7?",
#     "What is 8 * 8?",
# ]

# for question in questions:
#     result = agent.invoke({"messages": [HumanMessage(content=question)]}, config=config)
#     print("messages : ", result["messages"])
#     print("--------------------------------------------------")
#     print("length response : ", len(result["messages"]))


# Summarization on tokens


@tool
def searchHotels(city: str) -> str:
    """Search hotels - return long reponse to use more tokens."""
    return f"""Hotels in {city} :
    1.Grand Hotel - 5 star
    2.City Inn -  4 star
    3.Budget Stay - 3 star
    """


agent = create_agent(
    model=model,
    checkpointer=InMemorySaver(),
    middleware=[
        SummarizationMiddleware(model=model, trigger=("tokens", 5), keep=("tokens", 2))
    ],
)


config = {"configurable": {"thread_id": "test-1"}}


def countTokens(messages):
    total_chars = sum(len(str(msg.content)) for msg in messages)
    return total_chars


threa_count = 1
cities = ["paris", "london", "tokyo", "new york", "sydney"]

for city in cities:
    # config = {"configurable": {"thread_id": threa_count}}
    # threa_count += 1

    result = agent.invoke(
        {"messages": [HumanMessage(content=f"Search hotels in {city}")]}, config=config
    )
    print("messages : ", result["messages"])
    print("--------------------------------------------------")
    print("length response : ", len(result["messages"]))
    print("token count : ", countTokens(result["messages"]))
    print("\n")
