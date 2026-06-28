import type { Router } from "express";
import { deliveryRunsController } from "./controller";
import { manifest } from "./manifest";

export function registerDeliveryRunsRoutes(router: Router) {
  router.get(manifest.routeBase, deliveryRunsController.list);
  router.post(manifest.routeBase, deliveryRunsController.create);
  router.patch(`${manifest.routeBase}/:id`, deliveryRunsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, deliveryRunsController.transition);
}
