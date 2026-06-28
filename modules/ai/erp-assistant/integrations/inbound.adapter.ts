export const erpAssistantInboundAdapter = {
  name: "ai/erp-assistant.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "ai/erp-assistant",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
