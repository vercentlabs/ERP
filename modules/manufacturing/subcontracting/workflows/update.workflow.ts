export const subcontractingUpdateWorkflow = {
  module: "manufacturing/subcontracting",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for manufacturing/subcontracting record ${recordId}`;
  },
};
