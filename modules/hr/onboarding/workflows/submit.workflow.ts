export const onboardingSubmitWorkflow = {
  module: "hr/onboarding",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for hr/onboarding record ${recordId}`;
  },
};
