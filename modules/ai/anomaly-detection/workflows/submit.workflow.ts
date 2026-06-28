export const anomalyDetectionSubmitWorkflow = {
  module: "ai/anomaly-detection",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for ai/anomaly-detection record ${recordId}`;
  },
};
