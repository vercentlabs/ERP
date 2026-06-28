import type { Router } from "express";
import { deliveryNotesController } from "./controller";
import { manifest } from "./manifest";

export function registerDeliveryNotesRoutes(router: Router) {
  router.get(manifest.routeBase, deliveryNotesController.list);
  router.post(manifest.routeBase, deliveryNotesController.create);
  router.patch(`${manifest.routeBase}/:id`, deliveryNotesController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, deliveryNotesController.transition);
}
