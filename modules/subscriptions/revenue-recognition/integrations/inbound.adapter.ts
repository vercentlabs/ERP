export const revenueRecognitionInboundAdapter = {
  name: "subscriptions/revenue-recognition.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "subscriptions/revenue-recognition",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
