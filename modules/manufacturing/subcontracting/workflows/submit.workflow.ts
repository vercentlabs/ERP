export const subcontractingSubmitWorkflow = {
  module: "manufacturing/subcontracting",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for manufacturing/subcontracting record ${recordId}`;
  },
};
