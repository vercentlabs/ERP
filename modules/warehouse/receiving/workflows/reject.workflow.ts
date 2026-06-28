export const receivingRejectWorkflow = {
  module: "warehouse/receiving",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for warehouse/receiving record ${recordId}`;
  },
};
