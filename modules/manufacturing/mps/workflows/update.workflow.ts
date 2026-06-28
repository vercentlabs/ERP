export const mpsUpdateWorkflow = {
  module: "manufacturing/mps",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for manufacturing/mps record ${recordId}`;
  },
};
