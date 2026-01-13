import React from "react";
import { Handle, Position } from "reactflow";

export default function BaseNode({
  id,
  title,
  inputs = [],
  outputs = [],
  children,
  style = {},
  type = "default",
}) {
  
  const typeColors = {
    input: "#E3FCEF",
    text: "#FFF9C4",
    output: "#E1F5FE",
    math: "#F3E5F5",
    condition: "#FFEBEE",
    delay: "#FBE9E7",
    markdown: "#F0F4C3",
    api: "#E8EAF6",
    default: "#fff",
  };

  return (
    <div
      style={{
        padding: "14px",
        border: "1px solid", 
        borderRadius: "12px",
        background: `linear-gradient(135deg, ${typeColors[type]} 0%, #ffffff 100%)`,
        minWidth: 180,
        boxShadow: "0 4px 10px rgba(0,0,0,0.12)",
        position: "relative",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        ...style,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 6px 14px rgba(0,0,0,0.18)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.12)";
      }}
    >
      {/* This trying to Rendered input handles spaced vertically */}
      {inputs.map((inputId, index) => (
        <Handle
          key={inputId}
          type="target"
          position={Position.Left}
          id={inputId}
          style={{
            top: `${(index + 1) * (100 / (inputs.length + 1))}%`,
            background: "#444",
            width: 10,
            height: 10,
          }}
        />
      ))}

      {/* Title bar styling */}
      <div
        style={{
          fontWeight: "600",
          marginBottom: 10,
          textAlign: "center",
          fontSize: "1em",
          color: "#333",
          padding: "6px",
          borderRadius: "8px",
          backgroundColor: "rgba(255,255,255,0.6)",
          boxShadow: "inset 0 1px 3px rgba(0,0,0,0.08)",
        }}
      >
        {title}
      </div>

      <div style={{ fontSize: "0.95em", color: "#222" }}>{children}</div>

      {outputs.map((outputId, index) => (
        <Handle
          key={outputId}
          type="source"
          position={Position.Right}
          id={outputId}
          style={{
            top: `${(index + 1) * (100 / (outputs.length + 1))}%`,
            background: "#444",
            width: 10,
            height: 10,
            borderRadius: "50%",
            border: "2px solid #fff",
          }}
        />
      ))}
    </div>
  );
}
