export const anomalyDetectionCloseWorkflow = {
  module: "ai/anomaly-detection",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for ai/anomaly-detection record ${recordId}`;
  },
};
