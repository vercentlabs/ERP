import type { Router } from "express";
import { billingSchedulesController } from "./controller";
import { manifest } from "./manifest";

export function registerBillingSchedulesRoutes(router: Router) {
  router.get(manifest.routeBase, billingSchedulesController.list);
  router.post(manifest.routeBase, billingSchedulesController.create);
  router.patch(`${manifest.routeBase}/:id`, billingSchedulesController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, billingSchedulesController.transition);
}
