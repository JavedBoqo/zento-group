import "server-only";
import type { z } from "zod";
import type { careerInput } from "./admin-validation";
import Career from "@/models/Career";
import { reserveImages, releaseImages } from "./media";

export async function createCareer(input: z.infer<typeof careerInput>) {
  const changes = await reserveImages(input);
  try {
    return await Career.create(input);
  } catch (error) {
    await releaseImages(changes.added, false);
    throw error;
  }
}
