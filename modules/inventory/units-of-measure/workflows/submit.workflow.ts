export const unitsOfMeasureSubmitWorkflow = {
  module: "inventory/units-of-measure",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for inventory/units-of-measure record ${recordId}`;
  },
};
