export const segmentsSubmitWorkflow = {
  module: "crm/segments",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for crm/segments record ${recordId}`;
  },
};
