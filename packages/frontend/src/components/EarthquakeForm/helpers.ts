import { z } from 'zod';

export const EarthquakeSchema = z.object({
  location: z.string().nonempty({ message: 'This field is required!' }),
  magnitude: z.string().refine(
    (value) => {
      const number = parseFloat(value);
      return !isNaN(number) && number >= 1 && number <= 10;
    },
    { message: 'Value must be between 1 and 10' }
  ),
  date: z.string().nonempty({ message: 'This field is required!' }),
  id: z.optional(z.string()),
});

export const EarthquakesSchema = z.object({
  earthquakes: z.array(EarthquakeSchema),
});

export type EarthquakeSchemaType = z.infer<typeof EarthquakeSchema>;
export type EarthquakesSchemaType = z.infer<typeof EarthquakesSchema>;
