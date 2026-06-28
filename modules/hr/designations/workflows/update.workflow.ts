export const designationsUpdateWorkflow = {
  module: "hr/designations",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for hr/designations record ${recordId}`;
  },
};
