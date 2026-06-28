export const discreteManufacturingCreateWorkflow = {
  module: "industry-packs/discrete-manufacturing",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for industry-packs/discrete-manufacturing record ${recordId}`;
  },
};
