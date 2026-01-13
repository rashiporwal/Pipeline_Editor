<hr><hr width="400px" color="#fff"><hr width="900px">

## Project overview
This project is a node‑based pipeline editor built with React (frontend) and FastAPI (backend). It fulfills all four assessment parts:

- ***1.Node abstraction:*** A reusable BaseNode component standardizes structure, styling, and handle logic across all nodes.

- ***Styling:*** A unified, modern design etc.

- ***Text node logic:*** Auto‑resizing and {{variable}} substitution with dynamic handles.

- ***Backend integration:*** Frontend submits the pipeline to FastAPI, which returns node/edge counts and DAG(Directed Acyclic Graph) for validity.

#### >> Features&working
**Reusable node architecture:**  
Ensures scalability— when new nodes are created by extending a single abstraction.


**Dynamic text handling:** 
Auto‑resize and variable substitution using {{variable}} syntax with left‑side handles.

**Pipeline validation (DAG):** Backend computes num_nodes, num_edges, and is_dag to guarantee acyclic, executable pipelines.


>> Why DAG validation
Definition: A Directed Acyclic Graph (DAG) is a graph with directed edges and no cycles.

- *Why it matters:*

- **1.Predictable execution:** No infinite loops; data flows forward.

- **2.Topological ordering:** Enables safe scheduling of node execution.

- **3.Workflow correctness:** Standard in pipeline engines (ETL, orchestration, ML flows).

<hr><hr width="400px">

## ****Tech stack****
- >Frontend: React, React Flow

- >Backend: Python, FastAPI

- >Styling: Custom CSS (gradients, shadows, responsive layout)

- >Tooling: npm, uvicorn

<hr><hr>

# Demo workflow
# **Add nodes:** Input → Text → Output (connect left to right).

- >Enter data:

**Input Node:** Set name = Rashi.

**Text Node:** Type Hello {{name}}.

**Run pipeline:**

### ***Result:*** Text resolves to Hello Rashi; Output Node displays the same.

**Submit pipeline:**

####  Alert: Shows num_nodes, num_edges, and is_dag
https://github.com/user-attachments/assets/09d7025c-096f-445a-b104-23133e3b92f4


<!-- hr -->
<hr><hr width="400px">

# Setup and run
> - Frontend
Install:

***Command:***  npm i

***Directory:***  /frontend

/ - Start:





***cmd:***  npm start

### URL:  http://localhost:3000

> * Backend
Install (if needed):

**Command:**  pip install fastapi uvicorn

**Directory:**  /backend 

***Run:***

### ***cmd:*** uvicorn main:app --reload

### ***URL***  : http://127.0.0.1:8000
