export const mpsRejectWorkflow = {
  module: "manufacturing/mps",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for manufacturing/mps record ${recordId}`;
  },
};
