export const carriersCloseWorkflow = {
  module: "logistics/carriers",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for logistics/carriers record ${recordId}`;
  },
};
