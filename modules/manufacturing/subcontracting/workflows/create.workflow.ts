export const subcontractingCreateWorkflow = {
  module: "manufacturing/subcontracting",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for manufacturing/subcontracting record ${recordId}`;
  },
};
