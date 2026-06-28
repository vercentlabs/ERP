import type { Router } from "express";
import { settingsController } from "./controller";
import { manifest } from "./manifest";

export function registerSettingsRoutes(router: Router) {
  router.get(manifest.routeBase, settingsController.list);
  router.post(manifest.routeBase, settingsController.create);
  router.patch(`${manifest.routeBase}/:id`, settingsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, settingsController.transition);
}
