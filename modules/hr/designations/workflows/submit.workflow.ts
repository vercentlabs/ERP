export const designationsSubmitWorkflow = {
  module: "hr/designations",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for hr/designations record ${recordId}`;
  },
};
