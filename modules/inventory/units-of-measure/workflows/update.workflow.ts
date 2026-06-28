export const unitsOfMeasureUpdateWorkflow = {
  module: "inventory/units-of-measure",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for inventory/units-of-measure record ${recordId}`;
  },
};
