export const companiesRejectWorkflow = {
  module: "platform/companies",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for platform/companies record ${recordId}`;
  },
};
