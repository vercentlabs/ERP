import type { Router } from "express";
import { accountingPeriodsController } from "./controller";
import { manifest } from "./manifest";

export function registerAccountingPeriodsRoutes(router: Router) {
  router.get(manifest.routeBase, accountingPeriodsController.list);
  router.post(manifest.routeBase, accountingPeriodsController.create);
  router.patch(`${manifest.routeBase}/:id`, accountingPeriodsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, accountingPeriodsController.transition);
}
