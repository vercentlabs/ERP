export const freightRatesCloseWorkflow = {
  module: "logistics/freight-rates",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for logistics/freight-rates record ${recordId}`;
  },
};
