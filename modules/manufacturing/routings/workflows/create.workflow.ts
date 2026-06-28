export const routingsCreateWorkflow = {
  module: "manufacturing/routings",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for manufacturing/routings record ${recordId}`;
  },
};
