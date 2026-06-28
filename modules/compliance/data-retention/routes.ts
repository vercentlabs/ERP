import type { Router } from "express";
import { dataRetentionController } from "./controller";
import { manifest } from "./manifest";

export function registerDataRetentionRoutes(router: Router) {
  router.get(manifest.routeBase, dataRetentionController.list);
  router.post(manifest.routeBase, dataRetentionController.create);
  router.patch(`${manifest.routeBase}/:id`, dataRetentionController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, dataRetentionController.transition);
}
