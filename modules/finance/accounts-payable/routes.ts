import type { Router } from "express";
import { accountsPayableController } from "./controller";
import { manifest } from "./manifest";

export function registerAccountsPayableRoutes(router: Router) {
  router.get(manifest.routeBase, accountsPayableController.list);
  router.post(manifest.routeBase, accountsPayableController.create);
  router.patch(`${manifest.routeBase}/:id`, accountsPayableController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, accountsPayableController.transition);
}
