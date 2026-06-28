import type { Router } from "express";
import { bankReconciliationController } from "./controller";
import { manifest } from "./manifest";

export function registerBankReconciliationRoutes(router: Router) {
  router.get(manifest.routeBase, bankReconciliationController.list);
  router.post(manifest.routeBase, bankReconciliationController.create);
  router.patch(`${manifest.routeBase}/:id`, bankReconciliationController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, bankReconciliationController.transition);
}
