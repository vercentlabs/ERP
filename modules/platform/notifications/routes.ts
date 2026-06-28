import type { Router } from "express";
import { notificationsController } from "./controller";
import { manifest } from "./manifest";

export function registerNotificationsRoutes(router: Router) {
  router.get(manifest.routeBase, notificationsController.list);
  router.post(manifest.routeBase, notificationsController.create);
  router.patch(`${manifest.routeBase}/:id`, notificationsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, notificationsController.transition);
}
