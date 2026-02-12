import { defineCollection, z } from 'astro:content';

const subtopicSchema = z.object({
  code: z.string().min(1),
  title: z.string().min(1)
});

const ibTextbooks = defineCollection({
  schema: z.object({
    level: z.enum(['sl', 'hl']),
    unitNumber: z.number().int().min(1),
    unitName: z.string().min(1),
    summary: z.string().min(1),
    subtopics: z.array(subtopicSchema).min(1),
    sourcePolicy: z.literal('ib_content_md_first')
  })
});

export const collections = {
  'ib-textbooks': ibTextbooks
};
