export const unitsOfMeasureRejectWorkflow = {
  module: "inventory/units-of-measure",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for inventory/units-of-measure record ${recordId}`;
  },
};
