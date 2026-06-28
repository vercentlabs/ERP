export const processManufacturingCancelWorkflow = {
  module: "industry-packs/process-manufacturing",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for industry-packs/process-manufacturing record ${recordId}`;
  },
};
