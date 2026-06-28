export const unitsOfMeasureApproveWorkflow = {
  module: "inventory/units-of-measure",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for inventory/units-of-measure record ${recordId}`;
  },
};
