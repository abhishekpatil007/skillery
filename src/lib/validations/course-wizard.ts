import { z } from "zod";
import { COURSE_CATEGORIES, COURSE_LEVELS } from "@/types/course-wizard";

export const basicsSchema = z.object({
  title: z
    .string()
    .min(1, "Course title is required")
    .min(10, "Title must be at least 10 characters")
    .max(100, "Title must be less than 100 characters"),
  subtitle: z
    .string()
    .min(1, "Course subtitle is required")
    .min(20, "Subtitle must be at least 20 characters")
    .max(200, "Subtitle must be less than 200 characters"),
  category: z
    .string()
    .min(1, "Category is required")
    .refine((val) => COURSE_CATEGORIES.includes(val as typeof COURSE_CATEGORIES[number]), "Invalid category"),
  level: z
    .enum(COURSE_LEVELS),
  language: z
    .string()
    .min(1, "Language is required"),
  primaryTopicTags: z
    .array(z.string())
    .min(1, "At least one topic tag is required")
    .max(10, "Maximum 10 topic tags allowed")
});

export const curriculumSchema = z.object({
  sections: z
    .array(z.object({
      id: z.string(),
      title: z
        .string()
        .min(1, "Section title is required")
        .max(100, "Section title must be less than 100 characters"),
      description: z.string().optional(),
      lectures: z
        .array(z.object({
          id: z.string(),
          title: z
            .string()
            .min(1, "Lecture title is required")
            .max(100, "Lecture title must be less than 100 characters"),
          description: z.string().optional(),
          type: z.enum(['video', 'text', 'quiz', 'assignment']),
          duration: z
            .number()
            .min(0, "Duration must be positive")
            .max(600, "Duration must be less than 10 hours"),
          isPreview: z.boolean(),
          videoUrl: z.string().optional(),
          content: z.string().optional(),
          order: z.number(),
          sectionId: z.string()
        }))
        .min(1, "Each section must have at least one lecture"),
      order: z.number()
    }))
    .min(1, "Course must have at least one section")
});

export const landingPageSchema = z.object({
  description: z
    .string()
    .min(1, "Course description is required")
    .min(100, "Description must be at least 100 characters")
    .max(2000, "Description must be less than 2000 characters"),
  whatYoullLearn: z
    .array(z.string())
    .min(3, "At least 3 learning outcomes are required")
    .max(15, "Maximum 15 learning outcomes allowed"),
  prerequisites: z
    .array(z.string())
    .max(10, "Maximum 10 prerequisites allowed"),
  promoVideoUrl: z
    .string()
    .url("Please enter a valid video URL")
    .optional()
    .or(z.literal("")),
  courseImageUrl: z
    .string()
    .url("Please enter a valid image URL")
    .optional()
    .or(z.literal(""))
});

export const pricingSchema = z.object({
  price: z
    .number()
    .min(0, "Price must be positive")
    .max(999, "Price must be less than $999"),
  originalPrice: z
    .number()
    .min(0, "Original price must be positive")
    .max(999, "Original price must be less than $999")
    .optional(),
  discountPercentage: z
    .number()
    .min(0, "Discount must be positive")
    .max(100, "Discount cannot exceed 100%")
    .optional(),
  visibility: z.enum(['draft', 'published']),
  isSubmitted: z.boolean()
});

export const fullCourseSchema = z.object({
  // Basics
  title: basicsSchema.shape.title,
  subtitle: basicsSchema.shape.subtitle,
  category: basicsSchema.shape.category,
  level: basicsSchema.shape.level,
  language: basicsSchema.shape.language,
  primaryTopicTags: basicsSchema.shape.primaryTopicTags,
  
  // Curriculum
  sections: curriculumSchema.shape.sections,
  
  // Landing Page
  description: landingPageSchema.shape.description,
  whatYoullLearn: landingPageSchema.shape.whatYoullLearn,
  prerequisites: landingPageSchema.shape.prerequisites,
  promoVideoUrl: landingPageSchema.shape.promoVideoUrl,
  courseImageUrl: landingPageSchema.shape.courseImageUrl,
  
  // Pricing & Publishing
  price: pricingSchema.shape.price,
  originalPrice: pricingSchema.shape.originalPrice,
  discountPercentage: pricingSchema.shape.discountPercentage,
  visibility: pricingSchema.shape.visibility,
  isSubmitted: pricingSchema.shape.isSubmitted
});

export type BasicsFormData = z.infer<typeof basicsSchema>;
export type CurriculumFormData = z.infer<typeof curriculumSchema>;
export type LandingPageFormData = z.infer<typeof landingPageSchema>;
export type PricingFormData = z.infer<typeof pricingSchema>;
export type FullCourseFormData = z.infer<typeof fullCourseSchema>;
