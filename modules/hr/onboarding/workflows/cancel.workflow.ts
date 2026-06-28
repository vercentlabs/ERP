export const onboardingCancelWorkflow = {
  module: "hr/onboarding",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for hr/onboarding record ${recordId}`;
  },
};
