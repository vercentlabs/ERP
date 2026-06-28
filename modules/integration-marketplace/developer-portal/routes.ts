import type { Router } from "express";
import { developerPortalController } from "./controller";
import { manifest } from "./manifest";

export function registerDeveloperPortalRoutes(router: Router) {
  router.get(manifest.routeBase, developerPortalController.list);
  router.post(manifest.routeBase, developerPortalController.create);
  router.patch(`${manifest.routeBase}/:id`, developerPortalController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, developerPortalController.transition);
}
