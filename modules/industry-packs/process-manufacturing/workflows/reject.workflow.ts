export const processManufacturingRejectWorkflow = {
  module: "industry-packs/process-manufacturing",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for industry-packs/process-manufacturing record ${recordId}`;
  },
};
