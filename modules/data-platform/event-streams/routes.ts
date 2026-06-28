import type { Router } from "express";
import { eventStreamsController } from "./controller";
import { manifest } from "./manifest";

export function registerEventStreamsRoutes(router: Router) {
  router.get(manifest.routeBase, eventStreamsController.list);
  router.post(manifest.routeBase, eventStreamsController.create);
  router.patch(`${manifest.routeBase}/:id`, eventStreamsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, eventStreamsController.transition);
}
