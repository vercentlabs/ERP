export const companiesSubmitWorkflow = {
  module: "platform/companies",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for platform/companies record ${recordId}`;
  },
};
