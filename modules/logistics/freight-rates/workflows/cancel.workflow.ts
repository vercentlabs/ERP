export const freightRatesCancelWorkflow = {
  module: "logistics/freight-rates",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for logistics/freight-rates record ${recordId}`;
  },
};
