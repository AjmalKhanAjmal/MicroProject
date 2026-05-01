from dotenv import load_dotenv
import os
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate

# Load .env file
load_dotenv()

llm = ChatGroq(api_key=os.environ["GROQ_API_KEY"], model="llama-3.1-8b-instant")
response = llm.invoke("What is AI?")

prompt = ChatPromptTemplate.from_template("tell me a joke about {topic}")
print(prompt.format(topic="laptop"))


formatted_prompt = prompt.invoke({"topic": "LangChain"})

# print(formatted_prompt)

response = llm.invoke(formatted_prompt)

print(response.content)
