export const carriersSubmitWorkflow = {
  module: "logistics/carriers",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for logistics/carriers record ${recordId}`;
  },
};
