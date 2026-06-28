export const mrpUpdateWorkflow = {
  module: "manufacturing/mrp",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for manufacturing/mrp record ${recordId}`;
  },
};
