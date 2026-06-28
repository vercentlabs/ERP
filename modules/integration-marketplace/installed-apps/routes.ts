import type { Router } from "express";
import { installedAppsController } from "./controller";
import { manifest } from "./manifest";

export function registerInstalledAppsRoutes(router: Router) {
  router.get(manifest.routeBase, installedAppsController.list);
  router.post(manifest.routeBase, installedAppsController.create);
  router.patch(`${manifest.routeBase}/:id`, installedAppsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, installedAppsController.transition);
}
