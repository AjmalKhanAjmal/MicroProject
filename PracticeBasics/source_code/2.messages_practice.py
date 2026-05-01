from dotenv import load_dotenv
import os
from langchain_groq import ChatGroq
from langchain.messages import HumanMessage, AIMessage, SystemMessage


# Load .env file
load_dotenv()
api_key = os.environ["GROQ_API_KEY"]
# llm = ChatGroq(api_key=os.environ["GROQ_API_KEY"], model="llama-3.1-8b-instant")
# response = llm.invoke("What is AI?")
# print(response)


model = ChatGroq(
    api_key=api_key,
    model="llama-3.1-8b-instant",
    temperature=0,
    max_tokens=30,
    # reasoning_format="parsed",
    timeout=None,
    max_retries=2,
    # other params...
)


# system_msg = SystemMessage("You are a helpful assistant.")
# human_msg = HumanMessage("Hello, how are you?")

# # Use with chat models
# messages = [system_msg, human_msg]
# response = model.invoke(messages)  # Returns AIMessage

# data = {
#     "content": response.content,
#     "tool_calls": response.tool_calls,
#     "usage": response.usage_metadata,
#     "metadata": response.response_metadata,
# }
# print(data)


# messages = [
#     SystemMessage("You are a poetry expert"),
#     HumanMessage("Write a haiku about spring"),
#     AIMessage("Cherry blossoms bloom..."),
# ]
# response = model.invoke(messages)


# print(response.content)


# system_msg = SystemMessage("You are a helpful coding assistant.")

# messages = [system_msg, HumanMessage("How do I create a REST API?")]
# response = model.invoke(messages)

# print(response.content)


# # Create an AI message manually (e.g., for conversation history)
# ai_msg = AIMessage("I'd be happy to help you with that question!")

# # Add to conversation history
# messages = [
#     SystemMessage("You are a helpful assistant"),
#     HumanMessage("Can you help me?"),
#     ai_msg,  # Insert as if it came from the model
#     HumanMessage("Great! What's 2+2?"),
# ]

# print(messages)
# response = model.invoke(messages)

# print(response.content)


def get_weather(location: str) -> str:
    """Get the weather at a location."""
    ...


model_with_tools = model.bind_tools([get_weather])
response = model_with_tools.invoke("What's the weather in Paris?")

print(response)

for tool_call in response.tool_calls:
    print(f"Tool: {tool_call['name']}")
    print(f"Args: {tool_call['args']}")
    print(f"ID: {tool_call['id']}")
