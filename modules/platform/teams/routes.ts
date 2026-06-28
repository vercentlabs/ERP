import type { Router } from "express";
import { teamsController } from "./controller";
import { manifest } from "./manifest";

export function registerTeamsRoutes(router: Router) {
  router.get(manifest.routeBase, teamsController.list);
  router.post(manifest.routeBase, teamsController.create);
  router.patch(`${manifest.routeBase}/:id`, teamsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, teamsController.transition);
}
