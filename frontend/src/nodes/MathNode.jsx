import React from "react";
import BaseNode from "./base/BaseNode";

export default function MathNode({ id, data }) {
  return (
    <BaseNode
      id={id}
      title="Math Node"
      type="math" 
      inputs={["a", "b"]}
      outputs={["result"]}
    >
      <label style={{ display: "block", marginBottom: 6, fontSize: "0.9em" }}>
        Operation:
      </label>
      <select
        value={data.operation || "add"}
        onChange={(e) => data.onChange?.({ operation: e.target.value })}
        style={{
          width: "100%",
          padding: "6px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      >
        <option value="add">Add</option>
        <option value="subtract">Subtract</option>
        <option value="multiply">Multiply</option>
        <option value="divide">Divide</option>
      </select>
    </BaseNode>
  );
}
