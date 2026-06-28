import type { Router } from "express";
import { customerPortalController } from "./controller";
import { manifest } from "./manifest";

export function registerCustomerPortalRoutes(router: Router) {
  router.get(manifest.routeBase, customerPortalController.list);
  router.post(manifest.routeBase, customerPortalController.create);
  router.patch(`${manifest.routeBase}/:id`, customerPortalController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, customerPortalController.transition);
}
