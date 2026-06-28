import type { Router } from "express";
import { queuesController } from "./controller";
import { manifest } from "./manifest";

export function registerQueuesRoutes(router: Router) {
  router.get(manifest.routeBase, queuesController.list);
  router.post(manifest.routeBase, queuesController.create);
  router.patch(`${manifest.routeBase}/:id`, queuesController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, queuesController.transition);
}
