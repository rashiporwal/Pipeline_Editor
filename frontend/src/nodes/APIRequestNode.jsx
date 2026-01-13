import React from "react";
import BaseNode from "./base/BaseNode";

export default function APIRequestNode({ id, data }) {
  return (
    <BaseNode
      id={id}
      title="API Request Node"
      type="api" 
      inputs={["in"]}
      outputs={["out"]}
    >
      <label style={{ display: "block", marginBottom: 6, fontSize: "0.9em" }}>
        API URL:
      </label>
      <input
        value={data.url || ""}
        onChange={(e) => data.onChange?.({ url: e.target.value })}
        placeholder="Enter API URL"
        style={{
          width: "100%",
          marginBottom: "10px",
          padding: "6px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />

      <label style={{ display: "block", marginBottom: 6, fontSize: "0.9em" }}>
        Method:
      </label>
      <select
        value={data.method || "GET"}
        onChange={(e) => data.onChange?.({ method: e.target.value })}
        style={{
          width: "100%",
          padding: "6px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      >
        <option value="GET">GET</option>
        <option value="POST">POST</option>
        <option value="PUT">PUT</option>
        <option value="DELETE">DELETE</option>
      </select>
    </BaseNode>
  );
}
