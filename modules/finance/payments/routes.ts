import type { Router } from "express";
import { paymentsController } from "./controller";
import { manifest } from "./manifest";

export function registerPaymentsRoutes(router: Router) {
  router.get(manifest.routeBase, paymentsController.list);
  router.post(manifest.routeBase, paymentsController.create);
  router.patch(`${manifest.routeBase}/:id`, paymentsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, paymentsController.transition);
}
