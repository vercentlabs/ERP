import type { Router } from "express";
import { recruitmentController } from "./controller";
import { manifest } from "./manifest";

export function registerRecruitmentRoutes(router: Router) {
  router.get(manifest.routeBase, recruitmentController.list);
  router.post(manifest.routeBase, recruitmentController.create);
  router.patch(`${manifest.routeBase}/:id`, recruitmentController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, recruitmentController.transition);
}
