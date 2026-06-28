export const segmentsCreateWorkflow = {
  module: "crm/segments",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for crm/segments record ${recordId}`;
  },
};
