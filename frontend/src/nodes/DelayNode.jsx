import React from "react";
import BaseNode from "./base/BaseNode";

export default function DelayNode({ id, data }) {
  return (
    <BaseNode
      id={id}
      title="Delay Node"
      type="delay" 
      inputs={["in"]}
      outputs={["out"]}
    >
      <label style={{ display: "block", marginBottom: 6, fontSize: "0.9em" }}>
        Delay (ms):
      </label>
      <input
        type="number"
        value={data.delay || 1000}
        onChange={(e) => data.onChange?.({ delay: Number(e.target.value) })}
        placeholder="Delay in milliseconds"
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
