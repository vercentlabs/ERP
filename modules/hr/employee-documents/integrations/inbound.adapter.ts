export const employeeDocumentsInboundAdapter = {
  name: "hr/employee-documents.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "hr/employee-documents",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
