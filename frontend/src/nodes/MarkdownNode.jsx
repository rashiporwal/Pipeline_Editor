import React from "react";
import BaseNode from "./base/BaseNode";

export default function MarkdownNode({ id, data }) {
  return (
    <BaseNode
      id={id}
      title="Markdown Node"
      type="markdown" 
      inputs={["in"]}
      outputs={["out"]}
    >
      <label style={{ display: "block", marginBottom: 6, fontSize: "0.9em" }}>
        Markdown:
      </label>
      <textarea
        value={data.markdown || ""}
        onChange={(e) => data.onChange?.({ markdown: e.target.value })}
        placeholder="Enter markdown text"
        rows={4}
        style={{
          width: "100%",
          resize: "none",
          padding: "6px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          fontFamily: "monospace",
        }}
      />
    </BaseNode>
  );
}
