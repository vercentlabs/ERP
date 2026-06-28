export const mrpCancelWorkflow = {
  module: "manufacturing/mrp",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for manufacturing/mrp record ${recordId}`;
  },
};
