export const mrpSubmitWorkflow = {
  module: "manufacturing/mrp",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for manufacturing/mrp record ${recordId}`;
  },
};
