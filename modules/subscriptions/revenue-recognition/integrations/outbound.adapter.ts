export const revenueRecognitionOutboundAdapter = {
  name: "subscriptions/revenue-recognition.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "subscriptions/revenue-recognition",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
