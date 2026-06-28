export const unitsOfMeasureCreateWorkflow = {
  module: "inventory/units-of-measure",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for inventory/units-of-measure record ${recordId}`;
  },
};
