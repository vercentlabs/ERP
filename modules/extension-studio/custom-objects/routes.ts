import type { Router } from "express";
import { customObjectsController } from "./controller";
import { manifest } from "./manifest";

export function registerCustomObjectsRoutes(router: Router) {
  router.get(manifest.routeBase, customObjectsController.list);
  router.post(manifest.routeBase, customObjectsController.create);
  router.patch(`${manifest.routeBase}/:id`, customObjectsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, customObjectsController.transition);
}
