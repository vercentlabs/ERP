export const discreteManufacturingApproveWorkflow = {
  module: "industry-packs/discrete-manufacturing",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for industry-packs/discrete-manufacturing record ${recordId}`;
  },
};
