import type { Router } from "express";
import { customLayoutsController } from "./controller";
import { manifest } from "./manifest";

export function registerCustomLayoutsRoutes(router: Router) {
  router.get(manifest.routeBase, customLayoutsController.list);
  router.post(manifest.routeBase, customLayoutsController.create);
  router.patch(`${manifest.routeBase}/:id`, customLayoutsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, customLayoutsController.transition);
}
