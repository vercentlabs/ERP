export const binsRejectWorkflow = {
  module: "warehouse/bins",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for warehouse/bins record ${recordId}`;
  },
};
