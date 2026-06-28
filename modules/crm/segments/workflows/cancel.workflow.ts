export const segmentsCancelWorkflow = {
  module: "crm/segments",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for crm/segments record ${recordId}`;
  },
};
