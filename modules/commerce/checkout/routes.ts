import type { Router } from "express";
import { checkoutController } from "./controller";
import { manifest } from "./manifest";

export function registerCheckoutRoutes(router: Router) {
  router.get(manifest.routeBase, checkoutController.list);
  router.post(manifest.routeBase, checkoutController.create);
  router.patch(`${manifest.routeBase}/:id`, checkoutController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, checkoutController.transition);
}
