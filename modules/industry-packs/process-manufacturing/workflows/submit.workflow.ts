export const processManufacturingSubmitWorkflow = {
  module: "industry-packs/process-manufacturing",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for industry-packs/process-manufacturing record ${recordId}`;
  },
};
