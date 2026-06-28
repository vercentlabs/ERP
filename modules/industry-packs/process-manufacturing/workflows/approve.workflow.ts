export const processManufacturingApproveWorkflow = {
  module: "industry-packs/process-manufacturing",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for industry-packs/process-manufacturing record ${recordId}`;
  },
};
