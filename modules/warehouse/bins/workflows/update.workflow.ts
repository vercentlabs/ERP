export const binsUpdateWorkflow = {
  module: "warehouse/bins",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for warehouse/bins record ${recordId}`;
  },
};
