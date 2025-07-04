'use client'

import type { SlrAnalysis } from '#/schemas/slr-analysis-response.schema'
import { useTranslations } from 'next-intl'
import SlrWordChart from './slr-word-chart'

export default function SlrResults ({
  slrAnalysis
}: {
  slrAnalysis: SlrAnalysis[]
}) {
  const t = useTranslations('results')
  return (
    <div className='space-y-6'>
      <h2 className='text-2xl font-bold text-gray-900 dark:text-gray-100'>
        {t('title')}
      </h2>
      <div className='grid gap-6'>
        {slrAnalysis.map((article, index) => (
          <div
            key={index}
            className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200'
          >
            <div className='space-y-4 mb-8'>
              <div className='flex flex-col space-y-2'>
                <h3 className='text-xl font-semibold text-gray-900 dark:text-gray-100'>
                  {article.title}
                </h3>
                <p className='text-sm text-gray-500 dark:text-gray-400'>
                  PDF #{index + 1}
                </p>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm'>
                {article.publicationType && (
                  <div>
                    <span className='font-medium text-gray-700 dark:text-sky-100'>
                      {t('publicationType')}
                    </span>
                    <span className='ml-2 text-gray-600 dark:text-gray-400'>
                      {article.publicationType}
                    </span>
                  </div>
                )}
                <div>
                  <span className='font-medium text-gray-700 dark:text-sky-100'>
                    {t('year')}
                  </span>
                  <span className='ml-2 text-gray-600 dark:text-gray-400'>
                    {article.year}
                  </span>
                </div>
                {article.source && (
                  <div>
                    <span className='font-medium text-gray-700 dark:text-sky-100'>
                      {t('source')}
                    </span>
                    <span className='ml-2 text-gray-600 dark:text-gray-400'>
                      {article.source}
                    </span>
                  </div>
                )}
                {article.issn && (
                  <div>
                    <span className='font-medium text-gray-700 dark:text-sky-100'>
                      {t('issn')}
                    </span>
                    <span className='ml-2 text-gray-600 dark:text-gray-400'>
                      {article.issn}
                    </span>
                  </div>
                )}
                {article.numberOfCitations != null && (
                  <div>
                    <span className='font-medium text-gray-700 dark:text-sky-100'>
                      {t('numberOfCitations')}
                    </span>
                    <span className='ml-2 text-gray-600 dark:text-gray-400'>
                      {article.numberOfCitations}
                    </span>
                  </div>
                )}
                {article.countries && article.countries.length > 0 && (
                  <div>
                    <span className='font-medium text-gray-700 dark:text-sky-100'>
                      {t('countries')}
                    </span>
                    <span className='ml-2 text-gray-600 dark:text-gray-400'>
                      {article.countries.join(', ')}
                    </span>
                  </div>
                )}
              </div>

              {article.authors && article.authors.length > 0 && (
                <div className='flex flex-col'>
                  <span className='font-medium text-gray-700 dark:text-sky-100'>
                    {t('authors')}
                  </span>
                  <ul className='ml-4 text-gray-600 list-decimal dark:text-gray-400'>
                    {article.authors.map((author, authorIndex) => (
                      <li key={authorIndex}>
                        <span className='text-base text-sky-950 dark:text-sky-100'>
                          {author.name}
                        </span>
                        ,{' '}
                        <span className='text-sm text-gray-500 dark:text-gray-400'>
                          {author.affiliation}
                        </span>
                        {author.hIndex != null && (
                          <span className='text-gray-500 dark:text-gray-400'>
                            {t('hIndex')} {author.hIndex}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {article.keywords && article.keywords.length > 0 && (
                <div>
                  <span className='font-medium text-gray-700 dark:text-sky-100'>
                    {t('keywords')}
                  </span>
                  <div className='mt-2 flex flex-wrap gap-2'>
                    {article.keywords.map((keyword, keywordIndex) => (
                      <span
                        key={keywordIndex}
                        className='px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-xs rounded-full'
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <span className='font-medium text-gray-700 dark:text-sky-100'>
                  {t('abstract')}
                </span>
                <p className='mt-1 text-gray-600 dark:text-gray-400 text-sm leading-relaxed'>
                  {article.resume}
                </p>
              </div>

              <div>
                <span className='font-medium text-gray-700 dark:text-sky-100'>
                  {t('conclusion')}
                </span>
                <p className='mt-1 text-gray-600 dark:text-gray-400 text-sm leading-relaxed'>
                  {article.conclusion}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <SlrWordChart analysisResults={slrAnalysis} />
    </div>
  )
}
