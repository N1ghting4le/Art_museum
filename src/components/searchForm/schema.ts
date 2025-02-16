import { z } from 'zod';

const getMaxLengthMessage = (max: number) => ({
  message: `Maximum length - ${max} characters`,
});

const year = new Date().getFullYear();
const stringSchema = z.string().trim();
const yearSchema = z.coerce
  .number({ invalid_type_error: 'Year must be a number' })
  .nonnegative({ message: 'Year must be non-negative' })
  .lte(year, { message: 'Year must not be greater than ' + year })
  .optional();

const Schema = z
  .object({
    title: stringSchema.max(50, getMaxLengthMessage(50)).optional(),
    artist_title: stringSchema.max(50, getMaxLengthMessage(50)).optional(),
    place_of_origin: stringSchema.max(50, getMaxLengthMessage(50)).optional(),
    style_title: stringSchema.max(50, getMaxLengthMessage(50)).optional(),
    start_year: yearSchema,
    end_year: yearSchema,
  })
  .refine(
    (data) => {
      if (data.start_year && data.end_year) {
        return data.start_year <= data.end_year;
      }

      return true;
    },
    {
      message: "Start year can't be greater than end year",
      path: ['start_year'],
    }
  );

export default Schema;

export type Fields = Record<keyof z.infer<typeof Schema>, string>;
