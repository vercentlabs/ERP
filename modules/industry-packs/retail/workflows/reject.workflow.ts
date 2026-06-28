export const retailRejectWorkflow = {
  module: "industry-packs/retail",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for industry-packs/retail record ${recordId}`;
  },
};
