from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow frontend to talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],       # Allow all origins (restrict later for security)
    allow_methods=["*"],       # Allow all HTTP methods
    allow_headers=["*"],       # Allow all headers
)

@app.get("/")
def home():
    return {"message": "FastAPI backend is running"}

@app.post("/pipelines/parse")
async def parse_pipeline(request: Request):
    body = await request.json()
    nodes = body.get("nodes", [])
    edges = body.get("edges", [])

    num_nodes = len(nodes)
    num_edges = len(edges)

    # --- Build adjacency list ---
    adjacency = {}
    incoming = {}
    for edge in edges:
        adjacency.setdefault(edge["source"], []).append(edge["target"])
        incoming.setdefault(edge["target"], []).append(edge["source"])

    # --- DAG check using DFS ---
    visited = set()
    rec_stack = set()

    def dfs(node_id):
        if node_id in rec_stack:
            return True  # cycle detected
        if node_id in visited:
            return False

        visited.add(node_id)
        rec_stack.add(node_id)

        for neighbor in adjacency.get(node_id, []):
            if dfs(neighbor):
                return True

        rec_stack.remove(node_id)
        return False

    is_dag = True
    for node in nodes:
        if dfs(node["id"]):
            is_dag = False
            break

    # --- Entry nodes (no incoming edges) ---
    entry_nodes = [node["id"] for node in nodes if node["id"] not in incoming]

    # --- Isolated nodes (no incoming or outgoing edges) ---
    isolated_nodes = [
        node["id"]
        for node in nodes
        if node["id"] not in incoming and node["id"] not in adjacency
    ]

    # --- Node types used ---
    node_types = list({node.get("type", "unknown") for node in nodes})

    # --- Final response ---
    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": is_dag,
        "entry_nodes": entry_nodes,
        "isolated_nodes": isolated_nodes,
        "node_types": node_types,
    }


# ---------------- NEW: Pipeline Execution ----------------
@app.post("/pipelines/run")
async def run_pipeline(request: Request):
    body = await request.json()
    nodes = {node["id"]: node for node in body.get("nodes", [])}
    edges = body.get("edges", [])

    # Build incoming edges map
    incoming = {node_id: [] for node_id in nodes}
    for edge in edges:
        incoming[edge["target"]].append(edge["source"])

    # Topological order (simple DFS)
    visited = set()
    order = []

    def dfs(node_id):
        if node_id in visited:
            return
        visited.add(node_id)
        for src in incoming.get(node_id, []):
            dfs(src)
        order.append(node_id)

    for node_id in nodes:
        dfs(node_id)

    # Execute nodes
    values = {}
    for node_id in order:
        node = nodes[node_id]
        node_type = node.get("type")
        data = node.get("data", {})

        if node_type == "input":
            # Store input values directly
            values[node_id] = data.copy()

        elif node_type == "text":
            text = data.get("text", "")
            # Replace variables using connected inputs
            for src_id in incoming[node_id]:
                for key, val in values.get(src_id, {}).items():
                    text = text.replace(f"{{{{{key}}}}}", str(val))
            values[node_id] = {"text": text}

        elif node_type == "output":
            # Collect result from connected source
            for src_id in incoming[node_id]:
                values[node_id] = values.get(src_id, {})

    return {"result": values}

