import React from "react";
import BaseNode from "./base/BaseNode";

export default function OutputNode({ id, data }) {
  // Prefer result if available, otherwise fallback to text
  const resolvedOutput = data.result || data.text;

  return (
    <BaseNode id={id} title="Output Node" type="output" inputs={["in"]}>
      {/* These are the Target selector */}
      <select
        value={data.target || "console"}
        onChange={(e) => data.onChange?.({ target: e.target.value })}
        style={{ marginBottom: "8px", width: "100%" }}
      >
        <option value="console">Console</option>
        <option value="file">File</option>
        <option value="webhook">Webhook</option>
      </select>

      
      {resolvedOutput && (
        <div
          style={{
            marginTop: "8px",
            padding: "6px",
            backgroundColor: "#f9f9f9",
            border: "1px solid #ddd",
            borderRadius: "4px",
            fontSize: "0.9em",
            color: "#333",
            whiteSpace: "pre-wrap", 
          }}
        >
          <strong>Result:</strong> {resolvedOutput}
        </div>
      )}
    </BaseNode>
  );
}
