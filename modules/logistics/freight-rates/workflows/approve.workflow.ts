export const freightRatesApproveWorkflow = {
  module: "logistics/freight-rates",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for logistics/freight-rates record ${recordId}`;
  },
};
