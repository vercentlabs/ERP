export const discreteManufacturingCancelWorkflow = {
  module: "industry-packs/discrete-manufacturing",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for industry-packs/discrete-manufacturing record ${recordId}`;
  },
};
