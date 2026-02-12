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

const igcseTextbooks = defineCollection({
  schema: z.object({
    topicNumber: z.number().int().min(1).max(10),
    topicName: z.string().min(1),
    summary: z.string().min(1),
    subtopics: z.array(subtopicSchema).min(1),
    sourcePolicy: z.literal('igcse_textbook_then_syllabus_then_slides')
  })
});

export const collections = {
  'ib-textbooks': ibTextbooks,
  'igcse-textbooks': igcseTextbooks
};
