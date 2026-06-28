export const mrpCreateWorkflow = {
  module: "manufacturing/mrp",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for manufacturing/mrp record ${recordId}`;
  },
};
