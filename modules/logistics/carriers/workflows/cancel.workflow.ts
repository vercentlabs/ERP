export const carriersCancelWorkflow = {
  module: "logistics/carriers",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for logistics/carriers record ${recordId}`;
  },
};
