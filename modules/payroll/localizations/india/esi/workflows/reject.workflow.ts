export const localizationsIndiaEsiRejectWorkflow = {
  module: "payroll/localizations/india/esi",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for payroll/localizations/india/esi record ${recordId}`;
  },
};
