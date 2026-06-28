export const subcontractingCloseWorkflow = {
  module: "manufacturing/subcontracting",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for manufacturing/subcontracting record ${recordId}`;
  },
};
