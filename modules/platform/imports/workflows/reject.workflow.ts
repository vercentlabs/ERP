export const importsRejectWorkflow = {
  module: "platform/imports",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for platform/imports record ${recordId}`;
  },
};
