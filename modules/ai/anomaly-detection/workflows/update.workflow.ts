export const anomalyDetectionUpdateWorkflow = {
  module: "ai/anomaly-detection",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for ai/anomaly-detection record ${recordId}`;
  },
};
