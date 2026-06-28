import type { Router } from "express";
import { scriptingController } from "./controller";
import { manifest } from "./manifest";

export function registerScriptingRoutes(router: Router) {
  router.get(manifest.routeBase, scriptingController.list);
  router.post(manifest.routeBase, scriptingController.create);
  router.patch(`${manifest.routeBase}/:id`, scriptingController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, scriptingController.transition);
}
