export const companiesCreateWorkflow = {
  module: "platform/companies",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for platform/companies record ${recordId}`;
  },
};
