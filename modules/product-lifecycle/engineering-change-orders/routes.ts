import type { Router } from "express";
import { engineeringChangeOrdersController } from "./controller";
import { manifest } from "./manifest";

export function registerEngineeringChangeOrdersRoutes(router: Router) {
  router.get(manifest.routeBase, engineeringChangeOrdersController.list);
  router.post(manifest.routeBase, engineeringChangeOrdersController.create);
  router.patch(`${manifest.routeBase}/:id`, engineeringChangeOrdersController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, engineeringChangeOrdersController.transition);
}
