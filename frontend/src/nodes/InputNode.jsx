import React from "react";
import BaseNode from "./base/BaseNode";

export default function InputNode({ id, data }) {
  const handleChange = (field, value) => {
    data.onChange?.({ [field]: value });
  };

  return (
    <BaseNode
      id={id}
      title="Input Node"
      type="input"
      outputs={["out"]}
      style={{
        background: "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)",
        borderRadius: "12px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        padding: "12px",
      }}
    >
      
      <div style={{ marginBottom: "12px" }}>
        <label
          style={{
            display: "block",
            fontSize: "0.9em",
            fontWeight: "600",
            marginBottom: "6px",
            color: "#444",
          }}
        >
          Label:
        </label>
        <input
          value={data.label || ""}
          onChange={(e) => handleChange("label", e.target.value)}
          placeholder="Enter label"
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "8px",
            border: "1px solid #bbb",
            fontSize: "0.95em",
            backgroundColor: "#fff",
            boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)",
          }}
        />
      </div>

      {/* Name field */}
      <div style={{ marginBottom: "12px" }}>
        <label
          style={{
            display: "block",
            fontSize: "0.9em",
            fontWeight: "600",
            marginBottom: "6px",
            color: "#444",
          }}
        >
          Name:
        </label>
        <input
          value={data.name || ""}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="Enter name"
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "8px",
            border: "1px solid #bbb",
            fontSize: "0.95em",
            backgroundColor: "#fff",
            boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)",
          }}
        />
      </div>

      {/* This Show preview of values being passed */}
      {(data.label || data.name) && (
        <div
          style={{
            marginTop: "14px",
            padding: "10px",
            backgroundColor: "#f0f7ff",
            // border: "1px solid #a3c4f3",
            borderRadius: "8px",
            fontSize: "0.9em",
            color: "#2c3e50",
            // boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
          }}
        >
          <strong style={{ color: "#1a73e8" }}>Output Preview:</strong>
          <div>label = {data.label || "(empty)"}</div>
          <div>name = {data.name || "(empty)"}</div>
        </div>
      )}
    </BaseNode>
  );
}
