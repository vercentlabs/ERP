import type { Router } from "express";
import { approvalsAuditController } from "./controller";
import { manifest } from "./manifest";

export function registerApprovalsAuditRoutes(router: Router) {
  router.get(manifest.routeBase, approvalsAuditController.list);
  router.post(manifest.routeBase, approvalsAuditController.create);
  router.patch(`${manifest.routeBase}/:id`, approvalsAuditController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, approvalsAuditController.transition);
}
