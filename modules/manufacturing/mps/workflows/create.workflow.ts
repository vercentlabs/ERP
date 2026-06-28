export const mpsCreateWorkflow = {
  module: "manufacturing/mps",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for manufacturing/mps record ${recordId}`;
  },
};
