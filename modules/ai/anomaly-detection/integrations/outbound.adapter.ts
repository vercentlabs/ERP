export const anomalyDetectionOutboundAdapter = {
  name: "ai/anomaly-detection.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "ai/anomaly-detection",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
