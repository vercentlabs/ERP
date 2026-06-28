export const customWorkflowsInboundAdapter = {
  name: "extension-studio/custom-workflows.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "extension-studio/custom-workflows",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
