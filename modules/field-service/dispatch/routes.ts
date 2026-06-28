import type { Router } from "express";
import { dispatchController } from "./controller";
import { manifest } from "./manifest";

export function registerDispatchRoutes(router: Router) {
  router.get(manifest.routeBase, dispatchController.list);
  router.post(manifest.routeBase, dispatchController.create);
  router.patch(`${manifest.routeBase}/:id`, dispatchController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, dispatchController.transition);
}
