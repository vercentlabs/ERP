import type { Router } from "express";
import { customPagesController } from "./controller";
import { manifest } from "./manifest";

export function registerCustomPagesRoutes(router: Router) {
  router.get(manifest.routeBase, customPagesController.list);
  router.post(manifest.routeBase, customPagesController.create);
  router.patch(`${manifest.routeBase}/:id`, customPagesController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, customPagesController.transition);
}
