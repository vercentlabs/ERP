export const controlsSubmitWorkflow = {
  module: "compliance/controls",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for compliance/controls record ${recordId}`;
  },
};
