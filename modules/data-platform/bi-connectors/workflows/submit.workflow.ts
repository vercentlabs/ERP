export const biConnectorsSubmitWorkflow = {
  module: "data-platform/bi-connectors",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for data-platform/bi-connectors record ${recordId}`;
  },
};
