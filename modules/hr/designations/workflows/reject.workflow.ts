export const designationsRejectWorkflow = {
  module: "hr/designations",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for hr/designations record ${recordId}`;
  },
};
