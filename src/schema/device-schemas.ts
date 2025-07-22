import * as z from "zod";

export const deviceSchema = z.object({
  name: z.string().min(1, "Device name is required"),
  model: z.string().min(1, "Model is required"),
  simType: z.string().min(1, "SIM type is required"),
  simNumber: z.string().min(1, "SIM number is required"),
  type: z.string().min(1, "Device type is required"),
});

export type DeviceFormData = z.infer<typeof deviceSchema>;
