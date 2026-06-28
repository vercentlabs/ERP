import type { Router } from "express";
import { publicApiController } from "./controller";
import { manifest } from "./manifest";

export function registerPublicApiRoutes(router: Router) {
  router.get(manifest.routeBase, publicApiController.list);
  router.post(manifest.routeBase, publicApiController.create);
  router.patch(`${manifest.routeBase}/:id`, publicApiController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, publicApiController.transition);
}
