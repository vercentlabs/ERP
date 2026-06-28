import type { Router } from "express";
import { proofOfDeliveryController } from "./controller";
import { manifest } from "./manifest";

export function registerProofOfDeliveryRoutes(router: Router) {
  router.get(manifest.routeBase, proofOfDeliveryController.list);
  router.post(manifest.routeBase, proofOfDeliveryController.create);
  router.patch(`${manifest.routeBase}/:id`, proofOfDeliveryController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, proofOfDeliveryController.transition);
}
