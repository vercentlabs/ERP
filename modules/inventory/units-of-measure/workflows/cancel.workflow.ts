export const unitsOfMeasureCancelWorkflow = {
  module: "inventory/units-of-measure",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for inventory/units-of-measure record ${recordId}`;
  },
};
