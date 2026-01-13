import React from "react";
import BaseNode from "./base/BaseNode";

export default function ConditionNode({ id, data }) {
  return (
    <BaseNode
      id={id}
      title="Condition Node"
      type="condition" 
      inputs={["input"]}
      outputs={["true", "false"]}
    >
      <label style={{ display: "block", marginBottom: 6, fontSize: "0.9em" }}>
        Condition:
      </label>
      <input
        value={data.condition || ""}
        onChange={(e) => data.onChange?.({ condition: e.target.value })}
        placeholder="Enter condition (e.g. > 10)"
        style={{
          width: "100%",
          padding: "6px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />
    </BaseNode>
  );
}
