import { z } from 'zod';

export const EarthquakeSchema = z.object({
  location: z.string().nonempty({ message: 'This field is required!' }),
  magnitude: z
    .number()
    .nonnegative({ message: 'Value must be between 1 and 10' })
    .min(1, { message: 'Value must be at least 1' })
    .max(10, { message: 'Value must be at most 10' }),
  date: z.string().nonempty({ message: 'This field is required!' }),
});

export type EarthquakeSchemaType = z.infer<typeof EarthquakeSchema>;
