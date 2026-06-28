export const biConnectorsCreateWorkflow = {
  module: "data-platform/bi-connectors",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for data-platform/bi-connectors record ${recordId}`;
  },
};
