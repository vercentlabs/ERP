export type LogContext = {
  tenantId?: string;
  userId?: string;
  requestId?: string;
  module?: string;
};

export function createLogger(baseContext: LogContext = {}) {
  return {
    info(message: string, context: LogContext = {}) {
      console.info(JSON.stringify({ level: "info", message, ...baseContext, ...context }));
    },
    error(message: string, error?: unknown, context: LogContext = {}) {
      console.error(JSON.stringify({ level: "error", message, error: String(error), ...baseContext, ...context }));
    },
  };
}
