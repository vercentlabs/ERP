export const companiesUpdateWorkflow = {
  module: "platform/companies",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for platform/companies record ${recordId}`;
  },
};
