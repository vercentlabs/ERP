export const unitsOfMeasureCloseWorkflow = {
  module: "inventory/units-of-measure",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for inventory/units-of-measure record ${recordId}`;
  },
};
