import type { Router } from "express";
import { operationalDataStoreController } from "./controller";
import { manifest } from "./manifest";

export function registerOperationalDataStoreRoutes(router: Router) {
  router.get(manifest.routeBase, operationalDataStoreController.list);
  router.post(manifest.routeBase, operationalDataStoreController.create);
  router.patch(`${manifest.routeBase}/:id`, operationalDataStoreController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, operationalDataStoreController.transition);
}
