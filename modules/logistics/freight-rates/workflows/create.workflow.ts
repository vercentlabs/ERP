export const freightRatesCreateWorkflow = {
  module: "logistics/freight-rates",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for logistics/freight-rates record ${recordId}`;
  },
};
