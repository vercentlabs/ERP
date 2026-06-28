export const customPagesInboundAdapter = {
  name: "extension-studio/custom-pages.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "extension-studio/custom-pages",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
