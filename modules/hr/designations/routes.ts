import type { Router } from "express";
import { designationsController } from "./controller";
import { manifest } from "./manifest";

export function registerDesignationsRoutes(router: Router) {
  router.get(manifest.routeBase, designationsController.list);
  router.post(manifest.routeBase, designationsController.create);
  router.patch(`${manifest.routeBase}/:id`, designationsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, designationsController.transition);
}
