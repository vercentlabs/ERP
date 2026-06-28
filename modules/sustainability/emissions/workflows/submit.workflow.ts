export const emissionsSubmitWorkflow = {
  module: "sustainability/emissions",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for sustainability/emissions record ${recordId}`;
  },
};
