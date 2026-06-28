export const binsCreateWorkflow = {
  module: "warehouse/bins",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for warehouse/bins record ${recordId}`;
  },
};
