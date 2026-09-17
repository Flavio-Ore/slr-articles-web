import z from "zod";

export const AuthorSchema = z.object({
  "name": z.string(),
  "affiliation": z.string(),
  "hIndex": z.number(),
});
export type Author = z.infer<typeof AuthorSchema>;

export const SlrAnalysisSchema = z.object({
  "fileName": z.string(),
  "title": z.string(),
  "url": z.string(),
  "source": z.string(),
  "year": z.number(),
  "countries": z.array(z.string()),
  "issn": z.string(),
  "authors": z.array(AuthorSchema),
  "quartiles": z.string(),
  "resume": z.string(),
  "keywords": z.array(z.string()),
  "conclusion": z.string(),
});
export type SlrAnalysis = z.infer<typeof SlrAnalysisSchema>;
