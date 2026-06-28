import type { Router } from "express";
import { accountsReceivableController } from "./controller";
import { manifest } from "./manifest";

export function registerAccountsReceivableRoutes(router: Router) {
  router.get(manifest.routeBase, accountsReceivableController.list);
  router.post(manifest.routeBase, accountsReceivableController.create);
  router.patch(`${manifest.routeBase}/:id`, accountsReceivableController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, accountsReceivableController.transition);
}
