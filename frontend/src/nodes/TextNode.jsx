import React, { useState, useEffect } from "react";
import BaseNode from "./base/BaseNode";

export default function TextNode({ id, data }) {
  const [variables, setVariables] = useState([]);

  // Use Regex to find {{variable}} patterns
  useEffect(() => {
    const regex = /\{\{\s*([a-zA-Z_$][\w$]*)\s*\}\}/g;
    const found = [];
    let match;
    while ((match = regex.exec(data.text || "")) !== null) {
      if (!found.includes(match[1])) {
        found.push(match[1]);
      }
    }
    setVariables(found);
  }, [data.text]);

  // Here used auto-resize logic: adjust width & height based on text length
  const textLength = data.text?.length || 0;
  const dynamicHeight = Math.min(250, 40 + textLength / 2); // grow height
  const dynamicWidth = Math.min(420, 180 + textLength / 4); // grow width

  // Prefer resolved output if backend sent it
  const resolvedOutput = data.result || data.resolved || null;

  return (
    <BaseNode
      id={id}
      title="Text Node"
      type="text"
      inputs={variables}
      outputs={["out"]}
      style={{
        minWidth: dynamicWidth,
        background: "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)",
        borderRadius: "12px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        padding: "20px",
        border: "1px solid black",
      }}
    >
      <label
        style={{
          display: "block",
          marginBottom: 6,
          fontSize: "0.9em",
          fontWeight: "600",
          color: "#444",
        }}
      >
        Enter Text:
      </label>
      <textarea
        value={data.text || ""}
        onChange={(e) => data.onChange?.({ text: e.target.value })}
        placeholder="Type text with {{variables}}"
        style={{
          width: "100%",
          height: `${dynamicHeight}px`,
          resize: "none",
          padding: "8px",
          borderRadius: "8px",
          border: "1px solid #bbb",
          fontFamily: "monospace",
          fontSize: "0.95em",
          backgroundColor: "#fff",
          boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)",
        }}
      />
      {/* {resoved Output} */}
      {resolvedOutput && (
        <div
          style={{
            marginTop: "12px",
            padding: "10px",
            backgroundColor: "#2196F3",
            border: "1px solid #a3c4f3",
            borderRadius: "8px",
            fontSize: "0.95em",
            color: "#2c3e50",
            whiteSpace: "pre-wrap",
            boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
          }}
        >
          <strong style={{ color: "#1a73e8" }}>Resolved:</strong>{" "}
          {resolvedOutput}
        </div>
      )}
    </BaseNode>
  );
}
