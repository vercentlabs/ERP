export const revenueRecognitionOutboundAdapter = {
  name: "finance/revenue-recognition.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "finance/revenue-recognition",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
