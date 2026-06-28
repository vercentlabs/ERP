export const revenueRecognitionInboundAdapter = {
  name: "finance/revenue-recognition.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "finance/revenue-recognition",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
