import type { Router } from "express";
import { serviceWorkOrdersController } from "./controller";
import { manifest } from "./manifest";

export function registerServiceWorkOrdersRoutes(router: Router) {
  router.get(manifest.routeBase, serviceWorkOrdersController.list);
  router.post(manifest.routeBase, serviceWorkOrdersController.create);
  router.patch(`${manifest.routeBase}/:id`, serviceWorkOrdersController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, serviceWorkOrdersController.transition);
}
