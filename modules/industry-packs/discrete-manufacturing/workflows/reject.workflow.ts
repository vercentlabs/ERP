export const discreteManufacturingRejectWorkflow = {
  module: "industry-packs/discrete-manufacturing",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for industry-packs/discrete-manufacturing record ${recordId}`;
  },
};
