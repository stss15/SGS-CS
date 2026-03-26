import { z } from 'astro:content';

export const textbookVisibilitySchema = z.enum(['sl', 'hl', 'mixed']);

export const subtopicSchema = z.object({
  code: z.string().min(1),
  title: z.string().min(1),
  anchor: z.string().min(1).optional(),
  order: z.number().int().min(0).optional(),
  visibility: textbookVisibilitySchema.optional(),
  overview: z.string().min(1).optional()
});

export const textbookFigureSchema = z.object({
  id: z.string().min(1),
  src: z.string().min(1),
  alt: z.string().min(1),
  caption: z.string().min(1),
  credit: z.string().min(1).optional()
});

export const textbookMetadataSchema = z.object({
  chapterCode: z.string().min(1).optional(),
  chapterTitle: z.string().min(1).optional(),
  chapterSlug: z.string().min(1).optional(),
  chapterOrder: z.number().int().min(0).optional(),
  visibility: textbookVisibilitySchema.optional(),
  sections: z.array(subtopicSchema).optional(),
  figures: z.array(textbookFigureSchema).optional(),
  bodyFormat: z.enum(['markdown', 'html']).optional()
});

export type TextbookVisibilityValue = z.infer<typeof textbookVisibilitySchema>;
export type TextbookSubtopicValue = z.infer<typeof subtopicSchema>;
export type TextbookFigureValue = z.infer<typeof textbookFigureSchema>;
export type TextbookMetadataValue = z.infer<typeof textbookMetadataSchema>;
