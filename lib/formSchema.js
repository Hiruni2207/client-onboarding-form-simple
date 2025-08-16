import { z } from 'zod';

export const formSchema = z.object({
  // Rules for the Full Name field:
  // - Must be text (string)
  // - Must have at least 2 characters
  // - Must have at most 80 characters
  // - Can only contain letters, spaces, apostrophes ('), or hyphens (-)
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters.')
    .max(80, 'Full name must be at most 80 characters.')
    .regex(/^[a-zA-Z\s'-]+$/, 'Full name can only contain letters, spaces, hyphens, and apostrophes.'),

  // Rules for the Email field:
  // - Must be a valid email address
  email: z.string().email('Invalid email address.'),

  // Rules for the Company Name field:
  // - Must be text
  // - Must have between 2 and 100 characters
  companyName: z
    .string()
    .min(2, 'Company name must be at least 2 characters.')
    .max(100, 'Company name must be at most 100 characters.'),

  // Rules for the Services field (checkboxes):
  // - Must be a list (array) of choices
  // - Must have at least one choice selected
  services: z.array(z.string()).min(1, 'Please select at least one service.'),

  // Rules for the Budget field:
  // - It's optional, so a user can leave it empty
  // - If a number is entered, it must be a whole number
  // - Must be between 100 and 1,000,000
  budgetUsd: z
    .union([z.string().transform(val => Number(val)), z.number().nullable(), z.literal('')])
    .pipe(
      z.number()
        .int('Budget must be a whole number.')
        .min(100, 'Budget must be at least $100.')
        .max(1_000_000, 'Budget cannot exceed $1,000,000.')
        .optional()
        .or(z.literal('')),
    ).nullable().transform(val => val === '' ? null : val),

  // Rules for the Project Start Date field:
  // - Must be a date that is today or in the future
  projectStartDate: z
    .string()
    .refine((dateString) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset the time to the beginning of the day for a fair check
      const projectDate = new Date(dateString);
      projectDate.setHours(0, 0, 0, 0); // Reset the time to the beginning of the day
      return projectDate >= today;
    }, 'Project start date must be today or a future date.'),

  // Rules for the "Accept Terms" checkbox:
  // - Must be checked (true)
  acceptTerms: z.boolean().refine((val) => val === true, 'You must accept the terms.'),
});