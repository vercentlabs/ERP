export type RuleContext = Record<string, unknown>;
export type WorkflowRule = {
  field: string;
  equals: unknown;
  message: string;
};

export function evaluateRules(context: RuleContext, rules: WorkflowRule[]) {
  return rules.filter((rule) => context[rule.field] !== rule.equals).map((rule) => rule.message);
}
