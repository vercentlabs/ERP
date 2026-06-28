export const segmentsRejectWorkflow = {
  module: "crm/segments",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for crm/segments record ${recordId}`;
  },
};
