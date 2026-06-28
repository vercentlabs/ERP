export const routingsSubmitWorkflow = {
  module: "manufacturing/routings",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for manufacturing/routings record ${recordId}`;
  },
};
