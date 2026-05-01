# User Query
#    ↓
# Embeddings (OpenAI / HuggingFace)
#    ↓
# Vector DB (Chroma)
#    ↓
# Relevant Docs
#    ↓
# Groq LLM → Final Answer

from dotenv import load_dotenv
import os
from langchain_groq import ChatGroq
# from langchain_core.documents import Document

# from langchain.text_splitter import RecursiveCharacterTextSplitter
# from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_pinecone import PineconeVectorStore
from pinecone import Pinecone
from langchain_core.documents import Document

# from langchain.text_splitter import RecursiveCharacterTextSplitter


# Load .env file
load_dotenv()
api_key = os.environ["GROQ_API_KEY"]
pinecone_api_key = os.environ.get("PINECONE_API_KEY")

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


embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")


vector = embeddings.embed_query("Hello world")

# print(len(vector))  # should be 384


# ===========================


pc = Pinecone(api_key=pinecone_api_key)
index = pc.Index("testproject")


vector_store = PineconeVectorStore(embedding=embeddings, index=index)

# document = Document(
#     page_content="Hello, world!", metadata={"source": "https://example.com"}
# )


docs = [
    Document(
        page_content="Nike has more than 50 distribution centers across the United States to support its supply chain and retail operations."
    ),
    Document(
        page_content="Nike is a global sportswear company headquartered in Oregon, USA. It designs footwear, apparel, and equipment."
    ),
    Document(
        page_content="Amazon operates over 110 fulfillment centers in the United States to ensure fast delivery of products."
    ),
    Document(
        page_content="A distribution center is a warehouse where products are stored and shipped to retailers or customers."
    ),
    Document(
        page_content="Logistics and supply chain management are critical for companies like Nike and Amazon to deliver products efficiently."
    ),
]
# ids = vector_store.add_documents(documents=[document], ids=["id1"])

# stored_ids = vector_store.add_documents(documents=docs)


# print("vector ids : ", stored_ids)


results = vector_store.similarity_search(
    "How many distribution centers does Nike have in the US?", k=2
)

print("----------------------")

print(results[0])
