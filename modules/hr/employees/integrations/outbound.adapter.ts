export const employeesOutboundAdapter = {
  name: "hr/employees.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "hr/employees",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
