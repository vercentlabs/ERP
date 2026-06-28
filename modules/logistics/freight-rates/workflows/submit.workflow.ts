export const freightRatesSubmitWorkflow = {
  module: "logistics/freight-rates",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for logistics/freight-rates record ${recordId}`;
  },
};
