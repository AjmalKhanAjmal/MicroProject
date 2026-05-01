from typing_extensions import TypedDict
from langgraph.graph import StateGraph, START, END

# -------------------------------
# 1. Define State Schemas
# -------------------------------


class InputState(TypedDict):
    user_input: str


class OutputState(TypedDict):
    graph_output: str


class OverallState(TypedDict):
    foo: str
    user_input: str
    graph_output: str


class PrivateState(TypedDict):
    bar: str


# -------------------------------
# 2. Define Nodes (Functions)
# -------------------------------


def node_1(state: InputState) -> OverallState:
    # Takes user input and creates "foo"
    return {"foo": state["user_input"] + " name"}


def node_2(state: OverallState) -> PrivateState:
    # Uses "foo" and creates "bar"
    return {"bar": state["foo"] + " is"}


def node_3(state: PrivateState) -> OverallState:
    # Final output
    return {"graph_output": state["bar"] + " Lance"}


# -------------------------------
# 3. Build Graph
# -------------------------------

builder = StateGraph(OverallState, input_schema=InputState, output_schema=OverallState)

builder.add_node("node_1", node_1)
builder.add_node("node_2", node_2)
builder.add_node("node_3", node_3)

builder.add_edge(START, "node_1")
builder.add_edge("node_1", "node_2")
builder.add_edge("node_2", "node_3")
builder.add_edge("node_3", END)


# -------------------------------
# 4. Compile Graph
# -------------------------------

graph = builder.compile()


# -------------------------------
# 5. Run Graph
# -------------------------------

result = graph.invoke({"user_input": "My"})

print(result)
