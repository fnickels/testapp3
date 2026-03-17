import type { Request, Response } from "express";

import { buildApiError } from "../../models/api-error.js";
import { LocationResolutionService } from "../../services/locationResolutionService.js";
import { locationQuerySchema } from "../validators/locationQuery.js";

const resolver = new LocationResolutionService();

export async function searchLocationController(req: Request, res: Response): Promise<void> {
  const parseResult = locationQuerySchema.safeParse(req.query);
  if (!parseResult.success) {
    res.status(400).json(buildApiError("invalid_input", parseResult.error.issues[0]?.message ?? "Invalid location query"));
    return;
  }

  const { q } = parseResult.data;
  const resolution = await resolver.resolve(q);

  if (resolution.status === "ambiguous") {
    res.status(200).json({
      status: "ambiguous",
      message: resolution.message,
      candidates: resolution.candidates.map((candidate) => ({
        candidateId: candidate.id,
        displayName: candidate.name,
        region: candidate.region,
        country: candidate.country,
      })),
    });
    return;
  }

  res.status(200).json({
    status: "resolved",
    location: resolution.location,
  });
}
