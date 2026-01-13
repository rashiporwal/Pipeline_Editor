import React, { useState } from "react";
import ReactFlow, {
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";

// imported all custom nodes
import InputNode from "./nodes/InputNode";
import TextNode from "./nodes/TextNode";
import OutputNode from "./nodes/OutputNode";
import MathNode from "./nodes/MathNode";
import ConditionNode from "./nodes/ConditionNode";
import DelayNode from "./nodes/DelayNode";
import MarkdownNode from "./nodes/MarkdownNode";
import APIRequestNode from "./nodes/APIRequestNode";

// registered node types
const nodeTypes = {
  input: InputNode,
  text: TextNode,
  output: OutputNode,
  math: MathNode,
  condition: ConditionNode,
  delay: DelayNode,
  markdown: MarkdownNode,
  api: APIRequestNode,
};

// default data for per node type
function getDefaultData(type) {
  switch (type) {
    case "input":
      return { label: "Start", name: "" };
    case "text":
      return { text: "Hello {{name}}" };
    case "output":
      return { target: "console", result: "" };
    case "math":
      return { operation: "add" };
    case "condition":
      return { condition: "" };
    case "delay":
      return { delay: 1000 };
    case "markdown":
      return { markdown: "" };
    case "api":
      return { url: "", method: "GET" };
    default:
      return {};
  }
}

function App() {
  const [nodes, setNodes] = useState([
    {
      id: "1",
      type: "input",
      position: { x: 100, y: 100 },
      data: getDefaultData("input"),
    },
    {
      id: "2",
      type: "text",
      position: { x: 300, y: 100 },
      data: getDefaultData("text"),
    },
    {
      id: "3",
      type: "output",
      position: { x: 500, y: 100 },
      data: getDefaultData("output"),
    },
  ]);

  const [edges, setEdges] = useState([
    { id: "e1-2", source: "1", target: "2" },
    { id: "e2-3", source: "2", target: "3" },
  ]);

  const [results, setResults] = useState(null);
  const [showResults, setShowResults] = useState(true);

  // Using these colors for node types
  const typeColors = {
    input: "#4CAF50",
    text: "#2196F3",
    output: "#FF9800",
    math: "#9C27B0",
    condition: "#F44336",
    delay: "#795548",
    markdown: "#607D8B",
    api: "#3F51B5",
    default: "#333",
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {}
      <div
        style={{
          padding: "10px",
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        {Object.keys(nodeTypes).map((type) => (
          <button
            key={type}
            onClick={() => {
              const newNode = {
                id: String(nodes.length + 1),
                type,
                position: {
                  x: 100 + nodes.length * 50,
                  y: 100 + nodes.length * 50,
                },
                data: getDefaultData(type),
              };
              setNodes((nds) => [...nds, newNode]);
            }}
            style={{
              padding: "6px 12px",
              backgroundColor: "#eee",
              border: "1px solid #ccc",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Add {type.charAt(0).toUpperCase() + type.slice(1)} Node
          </button>
        ))}
      </div>

      <div style={{ flex: 1 }}>
        <ReactFlow
          nodes={nodes.map((node) => ({
            ...node,
            data: {
              ...node.data,
              onChange: (change) => {
                setNodes((nds) =>
                  nds.map((n) =>
                    n.id === node.id
                      ? { ...n, data: { ...n.data, ...change } }
                      : n
                  )
                );
              },
            },
          }))}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={(changes) =>
            setNodes((nds) => applyNodeChanges(changes, nds))
          }
          onEdgesChange={(changes) =>
            setEdges((eds) => applyEdgeChanges(changes, eds))
          }
          onConnect={(connection) =>
            setEdges((eds) => addEdge(connection, eds))
          }
          fitView
          
        />
      </div>

      {/* Submit button */}
      <div style={{ padding: "10px", textAlign: "center" }}>
        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={() => {
            const payload = { nodes, edges };
            fetch("http://localhost:8000/pipelines/parse", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            })
              .then((res) => res.json())
              .then((data) => {
                setResults(data);
                setShowResults(true);

                // Using Alert before submitting the input
                alert(
                  `Pipeline submitted!\n\n` +
                    `Nodes: ${data.num_nodes}\n` +
                    `Edges: ${data.num_edges}\n` +
                    `Is DAG: ${data.is_dag ? "Yes" : "No"}`
                );
              })
              .catch((err) => {
                setResults({ error: err.message });
                setShowResults(true);
                alert("Error: " + err.message);
              });
          }}
        >
          Submit Pipeline
        </button>
        {/* Run pipeline */}
        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "#673AB7",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginLeft: "10px",
          }}
          onClick={() => {
            const payload = { nodes, edges };
            fetch("http://localhost:8000/pipelines/run", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            })
              .then((res) => res.json())
              .then((data) => {
                const updatedNodes = nodes.map((node) => {
                  const result = data.result[node.id];
                  if (!result) return node;

                  return {
                    ...node,
                    data: {
                      ...node.data,
                      ...result,
                    },
                  };
                });
                setNodes(updatedNodes);

                const outputNode = updatedNodes.find(
                  (n) => n.type === "output"
                );
                const outputText =
                  outputNode?.data?.text || JSON.stringify(outputNode?.data);
              })
              .catch((err) => {
                alert("Execution Error: " + err.message);
              });
          }}
        >
          Run Pipeline
        </button>
      </div>

      {/* Collapsible Results Panel */}
      {results && (
        <div
          style={{ borderTop: "1px solid #ccc", backgroundColor: "#f9f9f9" }}
        >
          <button
            onClick={() => setShowResults(!showResults)}
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#ddd",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
              fontWeight: "bold",
            }}
          >
            {showResults ? "▼ Hide Results" : "▶ Show Results"}
          </button>

          {showResults && (
            <div style={{ padding: "15px" }}>
              <h3>Pipeline Analysis Results</h3>
              {results.error ? (
                <p style={{ color: "red" }}>Error: {results.error}</p>
              ) : (
                <ul style={{ textAlign: "left", lineHeight: "1.6" }}>
                  <li>
                    <strong>Nodes:</strong> {results.num_nodes}
                  </li>
                  <li>
                    <strong>Edges:</strong> {results.num_edges}
                  </li>
                  <li>
                    <strong>Is DAG:</strong> {results.is_dag ? "Yes" : "No"}
                  </li>
                  <li>
                    <strong>Entry Nodes:</strong>{" "}
                    {results.entry_nodes?.join(", ") || "None"}
                  </li>
                  <li>
                    <strong>Isolated Nodes:</strong>{" "}
                    {results.isolated_nodes?.join(", ") || "None"}
                  </li>
                  <li>
                    <strong>Node Types:</strong>{" "}
                    {results.node_types?.length > 0
                      ? results.node_types.map((type) => (
                          <span
                            key={type}
                            style={{
                              display: "inline-block",
                              marginRight: "8px",
                              padding: "4px 8px",
                              borderRadius: "12px",
                              backgroundColor:
                                typeColors[type] || typeColors.default,
                              color: "white",
                              fontSize: "0.85em",
                            }}
                          >
                            {type}
                          </span>
                        ))
                      : "None"}
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
