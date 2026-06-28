export const anomalyDetectionCancelWorkflow = {
  module: "ai/anomaly-detection",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for ai/anomaly-detection record ${recordId}`;
  },
};
