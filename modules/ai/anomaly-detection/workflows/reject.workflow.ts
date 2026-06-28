export const anomalyDetectionRejectWorkflow = {
  module: "ai/anomaly-detection",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for ai/anomaly-detection record ${recordId}`;
  },
};
