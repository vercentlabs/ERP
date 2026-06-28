export const scriptingInboundAdapter = {
  name: "extension-studio/scripting.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "extension-studio/scripting",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
