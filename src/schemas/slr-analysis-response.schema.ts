import z from 'zod'

export const AuthorSchema = z.object({
  name: z.string(),
  affiliation: z.string(),
  hIndex: z.number().nullable()
})
export type Author = z.infer<typeof AuthorSchema>

export const SlrAnalysisSchema = z.object({
  title: z.string(),
  url: z.string().nullable(),
  source: z.string(),
  year: z.number(),
  countries: z.array(z.string()),
  issn: z.string(),
  publicationType: z.string(),
  citations: z
    .array(
      z.object({
        year: z.number(),
        count: z.number()
      })
    )
    .nullable(),
  authors: z.array(AuthorSchema),
  quartiles: z.string().nullable(),
  resume: z.string(),
  keywords: z.array(z.string()),
  conclusion: z.string(),
  mostFrequentWords: z.array(
    z.object({
      word: z.string(),
      count: z.number()
    })
  )
})
export type SlrAnalysis = z.infer<typeof SlrAnalysisSchema>
