import type { Router } from "express";
import { financialReportsController } from "./controller";
import { manifest } from "./manifest";

export function registerFinancialReportsRoutes(router: Router) {
  router.get(manifest.routeBase, financialReportsController.list);
  router.post(manifest.routeBase, financialReportsController.create);
  router.patch(`${manifest.routeBase}/:id`, financialReportsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, financialReportsController.transition);
}
