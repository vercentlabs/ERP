export const routingsRejectWorkflow = {
  module: "manufacturing/routings",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for manufacturing/routings record ${recordId}`;
  },
};
