export const freightRatesRejectWorkflow = {
  module: "logistics/freight-rates",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for logistics/freight-rates record ${recordId}`;
  },
};
