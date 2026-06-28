import type { Router } from "express";
import { shippingController } from "./controller";
import { manifest } from "./manifest";

export function registerShippingRoutes(router: Router) {
  router.get(manifest.routeBase, shippingController.list);
  router.post(manifest.routeBase, shippingController.create);
  router.patch(`${manifest.routeBase}/:id`, shippingController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, shippingController.transition);
}
