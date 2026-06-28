export const emissionsRejectWorkflow = {
  module: "sustainability/emissions",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for sustainability/emissions record ${recordId}`;
  },
};
