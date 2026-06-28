import type { Router } from "express";
import { apiKeysController } from "./controller";
import { manifest } from "./manifest";

export function registerApiKeysRoutes(router: Router) {
  router.get(manifest.routeBase, apiKeysController.list);
  router.post(manifest.routeBase, apiKeysController.create);
  router.patch(`${manifest.routeBase}/:id`, apiKeysController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, apiKeysController.transition);
}
