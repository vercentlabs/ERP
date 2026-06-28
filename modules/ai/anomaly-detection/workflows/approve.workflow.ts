export const anomalyDetectionApproveWorkflow = {
  module: "ai/anomaly-detection",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for ai/anomaly-detection record ${recordId}`;
  },
};
