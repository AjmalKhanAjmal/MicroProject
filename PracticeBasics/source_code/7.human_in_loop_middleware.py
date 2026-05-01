from langchain.agents import create_agent
from langchain.agents.middleware import HumanInTheLoopMiddleware
from langgraph.checkpoint.memory import InMemorySaver
from dotenv import load_dotenv
import os
from langchain_groq import ChatGroq
from langchain_core.messages import HumanMessage
from langgraph.types import Command
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


@tool
def your_read_email_tool(email_id: str) -> str:
    """Mock function to read an email by its ID."""
    return f"Email content for ID: {email_id}"


@tool
def your_send_email_tool(recipient: str, subject: str, body: str) -> str:
    """Mock function to send an email."""
    return f"Email sent to {recipient} with subject '{subject}'"


config = {"configurable": {"thread_id": "thread_1"}}

agent = create_agent(
    model=model,
    tools=[your_read_email_tool, your_send_email_tool],
    checkpointer=InMemorySaver(),
    middleware=[
        HumanInTheLoopMiddleware(
            interrupt_on={
                "your_send_email_tool": {
                    "allowed_decisions": ["approve", "edit", "reject"],
                },
                "your_read_email_tool": False,
            }
        ),
    ],
)


result = agent.invoke(
    {
        "messages": [
            HumanMessage(
                content="send an email to john email id john@gmail.com with subject Hello and body How are you?"
                # content="send an email to john@gmail.com with subject Hello and body How are you?"
            )
        ]
    },
    config=config,
)


# print(result)

if "__interrupt__" in result:
    print("Agent is waiting for human input")
    result = agent.invoke(
        Command(
            # Decisions are provided as a list, one per action under review.
            # The order of decisions must match the order of actions
            # in the interrupt request.
            resume={
                # "decisions": [
                #     {
                #         "type": "approve",
                #     }
                # ]
                # "decisions": [{"type": "reject"}]
                "decisions": [
                    {
                        "type": "approve",
                        "edit_actions": {
                            "name": "your_send_email_tool",
                            "args": {
                                "recipient": "John@gmail.com",
                                "subject": "John bergman",
                                "body": "How are you?",
                            },
                        },
                    }
                ]
            }
        ),
        config=config,  # Same thread ID to resume the paused conversation
        # version="v2",
    )

    print(f"messages : {result['messages']}")

    # print(f"messages_single: {result['messages'][-1].content}")
