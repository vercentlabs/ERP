export const employeesInboundAdapter = {
  name: "hr/employees.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "hr/employees",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
