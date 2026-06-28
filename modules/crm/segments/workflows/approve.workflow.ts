export const segmentsApproveWorkflow = {
  module: "crm/segments",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for crm/segments record ${recordId}`;
  },
};
