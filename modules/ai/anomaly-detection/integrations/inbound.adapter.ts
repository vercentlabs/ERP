export const anomalyDetectionInboundAdapter = {
  name: "ai/anomaly-detection.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "ai/anomaly-detection",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
