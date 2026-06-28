export const routingsUpdateWorkflow = {
  module: "manufacturing/routings",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for manufacturing/routings record ${recordId}`;
  },
};
