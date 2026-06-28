export const returnsSubmitWorkflow = {
  module: "sales/returns",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for sales/returns record ${recordId}`;
  },
};
