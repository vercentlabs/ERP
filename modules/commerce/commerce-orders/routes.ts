import type { Router } from "express";
import { commerceOrdersController } from "./controller";
import { manifest } from "./manifest";

export function registerCommerceOrdersRoutes(router: Router) {
  router.get(manifest.routeBase, commerceOrdersController.list);
  router.post(manifest.routeBase, commerceOrdersController.create);
  router.patch(`${manifest.routeBase}/:id`, commerceOrdersController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, commerceOrdersController.transition);
}
