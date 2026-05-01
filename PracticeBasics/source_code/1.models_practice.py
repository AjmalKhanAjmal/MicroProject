from dotenv import load_dotenv
import os
from langchain_groq import ChatGroq

from langchain.tools import tool

from langchain.chat_models import init_chat_model

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
    max_tokens=200,
    # reasoning_format="parsed",
    timeout=None,
    max_retries=2,
    # other params...
)


# model = init_chat_model(
#     "llama-3.1-8b-instant",
#     model_provider="groq",
#     temperature=0,
#     max_tokens=10,
#     timeout=None,
#     max_retries=2,
# )

# response = model.invoke("Why do parrots have colorful feathers?")

# print(response)


# conversation = [
#     {
#         "role": "system",
#         "content": "You are a helpful assistant that translates English to French.",
#     },
#     # {"role": "user", "content": "Translate: I love programming."},
#     # {"role": "assistant", "content": "bjnsdbnasndianin."},
#     {"role": "user", "content": "Translate: I love building applications."},
# ]

# response = model.invoke(conversation)
# print(response.content)  # AIMessage("J'adore créer des applications.")


# Streams :

# full = None  # None | AIMessageChunk
# for chunk in model.stream("What color is the sky?"):
#     full = chunk if full is None else full + chunk
#     print(full.text)

# print(full.text)

# The
# The sky
# The sky is
# The sky is typically
# The sky is typically blue
# ...

# print(full.content_blocks)
# print(full.text)

# print(full.content_blocks[0]["text"])


# Batch

# responses = model.batch(
#     [
#         "Why do parrots have colorful feathers?",
#         "How do airplanes fly?",
#         "What is quantum computing?",
#     ]
# )
# for response in responses:
#     print(response.content)


# ✅ How it works:
# Sends all requests together
# Waits for ALL responses
# Returns in same order as input


# for index, response in model.batch_as_completed(
#     [
#         "Why do parrots have colorful feathers?",
#         "How do airplanes fly?",
#         "What is quantum computing?",
#     ]
# ):
#     print(f"\nQuestion {index}:")
#     print(response.text)


# ✅ How it works:
# Sends all requests in parallel
# Returns as soon as each finishes
# Order may be different
# Faster (stream-like)


# Tool calling


@tool
def get_weather(location: str) -> str:
    # print("location ", location)
    """Get the weather at a location."""
    print("location --- ", location)
    return f"It's sunny in {location}."


model_with_tools = model.bind_tools([get_weather])

response = model_with_tools.invoke("What's the weather like in Boston?")

print(response)


# for tool_call in response.tool_calls:
#     # View tool calls made by the model
#     print(f"Tool: {tool_call['name']}")
#     print(f"Args: {tool_call['args']['location']}")

#     tool_name = tool_call["name"]
#     tool_args = tool_call["args"]

#     # print("tool name ", tool_name)
#     # print("tool args ", tool_args["location"])
#     # Execute the tool manually
#     if tool_name == "get_weather":
#         # result = get_weather(**tool_args)
#         result = get_weather.invoke(tool_args)
#         print(result)


# @tool
# def get_weather(location: str) -> str:
#     # print("location ", location)
#     """Get the weather at a location."""
#     # print("location --- ", location)
#     return f"It's sunny in {location}."


# # Bind (potentially multiple) tools to the model
# model_with_tools = model.bind_tools([get_weather])

# # Step 1: Model generates tool calls
# messages = [{"role": "user", "content": "What's the weather in Boston?"}]
# ai_msg = model_with_tools.invoke(messages)
# # print("ai_msg ", ai_msg)
# messages.append(ai_msg)

# # Step 2: Execute tools and collect results
# for tool_call in ai_msg.tool_calls:
#     # print("tool_call ", tool_call)
#     # Execute the tool with the generated arguments
#     # tool_result = get_weather.invoke(tool_call)
#     tool_result = get_weather.invoke(tool_call["args"])
#     # print("tool_result ", tool_result)
#     messages.append(tool_result)
#     # print("messages ", messages)

# # Step 3: Pass results back to model for final response
# final_response = model_with_tools.invoke(messages)
# # print("final_response ", final_response)
# # print(final_response.text)
# # "The current weather in Boston is 72°F and sunny."

# # print(messages)


# for message in messages:
#     print("--------")
#     print(message)


# did practice

from dotenv import load_dotenv
import os
from langchain_groq import ChatGroq
from langchain.tools import tool
from langchain.agents import create_agent
from langchain.chat_models import init_chat_model

# # Load .env file
load_dotenv()
api_key = os.environ["GROQ_API_KEY"]

model = init_chat_model(
    "llama-3.1-8b-instant",
    model_provider="groq",
    temperature=0,
    max_tokens=200,
)


@tool
def get_weather(location: str) -> str:
    """Get the weather at a location."""
    print("location ---", location)
    return f"It's sunny in {location}."


# one
messages = [{"role": "user", "content": "What's the weather in Boston?"}]

model_with_tool = model.bind_tools([get_weather])
# Step 1: model suggests tool
response = model_with_tool.invoke(messages)

# Step 2: execute tool
tool_call = response.tool_calls[0]

tool_result = get_weather.invoke(tool_call["args"])


print(tool_result)

# two

# agent = create_agent(
#     model=model,
#     tools=[get_weather],
#     system_prompt="""
# You are a helpful assistant.

# - Use tools when needed.
# - After calling a tool and getting the result, DO NOT call the tool again.
# - Return the final answer to the user.
# """,
# )

# response = agent.invoke(
#     {"messages": [{"role": "user", "content": "What's the weather in Boston?"}]}
# )
