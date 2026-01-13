export const extractVariables = (text) => {
  const matches = text.match(/\{\{\s*([a-zA-Z_$][\w$]*)\s*\}\}/g) || [];
  const names = matches.map((m) =>
    m.replace("{{", "").replace("}}", "").trim()
  );
  return Array.from(new Set(names));
};

export const buildHandlesFromVars = (vars) =>
  vars.map((name, idx) => ({ id: `var-${name}`, top: 24 + idx * 24 }));
