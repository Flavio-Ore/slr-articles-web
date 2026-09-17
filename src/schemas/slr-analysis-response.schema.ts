import z from 'zod'

export const AuthorSchema = z.object({
  name: z.string(),
  affiliation: z.string(),
  hIndex: z.number()
})
export type Author = z.infer<typeof AuthorSchema>

export const SlrAnalysisSchema = z.object({
  title: z.string(),
  url: z.string(),
  source: z.string(),
  year: z.number(),
  countries: z.array(z.string()),
  issn: z.string(),
  publicationType: z.string(),
  numberOfCitations: z.number(),
  authors: z.array(AuthorSchema),
  quartiles: z.string(),
  resume: z.string(),
  keywords: z.array(z.string()),
  conclusion: z.string(),
  mostFrequentWords: z.array(
    z.object({
      word: z.string(),
      count: z.number()
    })
  ),
  titleWords: z.array(z.string()),
  abstractWords: z.array(z.string()),
  technicalTerms: z.array(z.string())
})
export type SlrAnalysis = z.infer<typeof SlrAnalysisSchema>
