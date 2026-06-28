export const locationsSubmitWorkflow = {
  module: "inventory/locations",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for inventory/locations record ${recordId}`;
  },
};
