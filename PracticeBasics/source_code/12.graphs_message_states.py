from langchain.messages import AnyMessage
from typing_extensions import TypedDict
from langchain.messages import AIMessage
from langgraph.graph import StateGraph
from IPython.display import Image, display
from langchain.messages import HumanMessage


class State(TypedDict):
    messages: list[AnyMessage]
    extra_field: int


def node(state: State):
    messages = state["messages"]
    new_message = AIMessage("Hello!")
    return {"messages": messages + [new_message], "extra_field": 10}


builder = StateGraph(State)
builder.add_node(node)
builder.set_entry_point("node")
graph = builder.compile()


# dataa = display(Image(graph.get_graph().draw_mermaid_png()))
# print(dataa)
img = graph.get_graph().draw_mermaid_png()

with open("graph.png", "wb") as f:
    f.write(img)
result = graph.invoke({"messages": [HumanMessage("Hi")]})


for message in result["messages"]:
    message.pretty_print()
# print(result)
