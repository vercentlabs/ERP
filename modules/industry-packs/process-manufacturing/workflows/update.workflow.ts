export const processManufacturingUpdateWorkflow = {
  module: "industry-packs/process-manufacturing",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for industry-packs/process-manufacturing record ${recordId}`;
  },
};
