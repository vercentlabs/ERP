export const mrpRejectWorkflow = {
  module: "manufacturing/mrp",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for manufacturing/mrp record ${recordId}`;
  },
};
