export const customWorkflowsOutboundAdapter = {
  name: "extension-studio/custom-workflows.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "extension-studio/custom-workflows",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
