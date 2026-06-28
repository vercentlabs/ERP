export const carriersRejectWorkflow = {
  module: "logistics/carriers",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for logistics/carriers record ${recordId}`;
  },
};
