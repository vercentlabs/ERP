export const anomalyDetectionCreateWorkflow = {
  module: "ai/anomaly-detection",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for ai/anomaly-detection record ${recordId}`;
  },
};
