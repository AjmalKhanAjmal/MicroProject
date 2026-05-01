from langchain.chat_models import init_chat_model
from dotenv import load_dotenv
import os
from langchain_groq import ChatGroq
from pydantic import BaseModel, Field
from langchain.agents import create_agent
from langchain.agents.structured_output import ToolStrategy
from typing import Literal
from langchain.tools import tool
from typing_extensions import TypedDict
from dataclasses import dataclass

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

# model = init_chat_model(
#     "llama-3.1-8b-instant",
#     model_provider="groq",
#     temperature=0,
#     max_tokens=200,
# )


class ContactInfo(BaseModel):
    """Contact information for a person."""

    name: str = Field(description="The name of the person")
    email: str = Field(description="The email address of the person")
    phone: str = Field(description="The phone number of the person")


agent = create_agent(
    model=model,
    response_format=ContactInfo,  # Auto-selects ProviderStrategy
)

result = agent.invoke(
    {
        "messages": [
            {
                "role": "user",
                "content": "Extract contact info from: John Doe, john@example.com, (555) 123-4567",
            }
        ]
    }
)

# arr1 = []
# for msg in result["messages"]:
#     # print("TYPE:", type(msg).__name__)
#     # print("CONTENT:", msg.content)
#     # print("ADDITIONAL KWARGS:", msg.additional_kwargs)
#     # print("-" * 40)
#     data = {
#         "type": msg.type,
#         "content": msg.content,
#         "additional_kwargs": msg.additional_kwargs,
#     }
#     arr1.append(data)

# print(arr1)


# print(result)
print(result["structured_response"])
# ContactInfo(name="John Doe", email="john@example.com", phone="(555) 123-4567")


# class Movie(BaseModel):
#     """A movie with details."""

#     title: str = Field(description="The title of the movie")
#     year: int = Field(description="The year the movie was released")
#     director: str = Field(description="The director of the movie")
#     rating: float = Field(description="The movie's rating out of 10")


# model_with_structure = model.with_structured_output(Movie)
# response = model_with_structure.invoke("Provide details about the movie The Godfather")
# print(response)
# Movie(title="Inception", year=2010, director="Christopher Nolan", rating=8.8)


# Tool calling strategy


# class ProductReview(BaseModel):
#     """Analysis of a product review."""

#     rating: int | None = Field(description="The rating of the product", ge=1, le=5)
#     sentiment: Literal["positive", "negative"] = Field(
#         description="The sentiment of the review"
#     )
#     key_points: list[str] = Field(
#         description="The key points of the review. Lowercase, 1-3 words each."
#     )


# agent = create_agent(model=model, response_format=ToolStrategy(ProductReview))

# result = agent.invoke(
#     {
#         "messages": [
#             {
#                 "role": "user",
#                 "content": "Analyze this review: 'Great product: 5 out of 5 stars. Fast shipping, but expensive'",
#             }
#         ]
#     }
# )

# print(result["structured_response"])
# # print(result)

# # ProductReview(rating=5, sentiment='positive', key_points=['fast shipping', 'expensive'])


# Custom tool message content


# class MeetingAction(BaseModel):
#     """Action items extracted from a meeting transcript."""

#     task: str = Field(description="The specific task to be completed")
#     assignee: str = Field(description="Person responsible for the task")
#     priority: Literal["low", "medium", "high"] = Field(description="Priority level")


# agent = create_agent(
#     model=model,
#     tools=[],
#     response_format=ToolStrategy(
#         schema=MeetingAction,
#         tool_message_content="Action item captured and added to meeting notes!",
#     ),
# )

# result = agent.invoke(
#     {
#         "messages": [
#             {
#                 "role": "user",
#                 "content": "From our meeting: Sarah needs to update the project timeline as soon as possible",
#             }
#         ]
#     }
# )

# print(result["structured_response"])


# ------------------------------
# TypedDict


# class ContactInfo(TypedDict):
#     name: str
#     email: str
#     phone: str


# agent = create_agent(
#     model=model,
#     response_format=ContactInfo,
# )

# result = agent.invoke(
#     {
#         "messages": [
#             {
#                 "role": "user",
#                 "content": "Extract contact info from: John Doe, john@example.com, (555) 123-4567",
#             }
#         ]
#     }
# )

# print(result["structured_response"])


# ---------------------------------
# Dataclass


# @dataclass
# class UserData:
#     name: str
#     age: int


# agent = create_agent(
#     model=model,
#     response_format=UserData,
# )

# result = agent.invoke(
#     {
#         "messages": [
#             {
#                 "role": "user",
#                 "content": "Extract contact info from: John Doe, john@example.com, (555) 123-4567",
#             }
#         ]
#     }
# )

# print(result["structured_response"])
