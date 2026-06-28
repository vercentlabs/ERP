export const companiesCloseWorkflow = {
  module: "platform/companies",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for platform/companies record ${recordId}`;
  },
};
