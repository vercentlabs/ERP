export const segmentsUpdateWorkflow = {
  module: "crm/segments",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for crm/segments record ${recordId}`;
  },
};
