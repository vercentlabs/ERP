export const processManufacturingCreateWorkflow = {
  module: "industry-packs/process-manufacturing",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for industry-packs/process-manufacturing record ${recordId}`;
  },
};
