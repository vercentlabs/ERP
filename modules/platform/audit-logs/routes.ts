import type { Router } from "express";
import { auditLogsController } from "./controller";
import { manifest } from "./manifest";

export function registerAuditLogsRoutes(router: Router) {
  router.get(manifest.routeBase, auditLogsController.list);
  router.post(manifest.routeBase, auditLogsController.create);
  router.patch(`${manifest.routeBase}/:id`, auditLogsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, auditLogsController.transition);
}
