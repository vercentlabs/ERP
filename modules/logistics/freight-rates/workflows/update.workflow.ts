export const freightRatesUpdateWorkflow = {
  module: "logistics/freight-rates",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for logistics/freight-rates record ${recordId}`;
  },
};
