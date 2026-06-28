export const processManufacturingCloseWorkflow = {
  module: "industry-packs/process-manufacturing",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for industry-packs/process-manufacturing record ${recordId}`;
  },
};
