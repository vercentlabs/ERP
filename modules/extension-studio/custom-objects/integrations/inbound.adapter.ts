export const customObjectsInboundAdapter = {
  name: "extension-studio/custom-objects.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "extension-studio/custom-objects",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
