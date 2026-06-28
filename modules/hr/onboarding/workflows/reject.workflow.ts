export const onboardingRejectWorkflow = {
  module: "hr/onboarding",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for hr/onboarding record ${recordId}`;
  },
};
