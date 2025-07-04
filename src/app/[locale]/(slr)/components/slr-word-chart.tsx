'use client'

import type { SlrAnalysis } from '#/schemas/slr-analysis-response.schema'
import { PieChart } from '@mui/x-charts'
import { BarChart } from '@mui/x-charts/BarChart'
import { useTranslations } from 'next-intl'
import { useEffect, useMemo, useState } from 'react'

interface SlrWordChartProps {
  analysisResults: SlrAnalysis[]
}

export default function SlrWordChart ({
  analysisResults = []
}: SlrWordChartProps) {
  const t = useTranslations('chart')
  const citations = useMemo(() => {
    return analysisResults.flatMap(article => article.citations || [])
  }, [analysisResults])

  const [wordMap, setWordMap] = useState(new Map<string, number>())
  const sortedData = useMemo(
    () =>
      Array.from(wordMap.entries())
        .map(([word, count]) => ({ word, count }))
        .sort((a, b) => b.count - a.count),
    [wordMap]
  )

  useEffect(() => {
    const newWordMap = new Map<string, number>()
    analysisResults.forEach(article => {
      article.mostFrequentWords?.forEach(wordData => {
        console.log({
          wordData
        })
        if (!newWordMap.has(wordData.word)) {
          console.log(`Adding new word: ${wordData.word}`)
          newWordMap.set(wordData.word, wordData.count)
          return
        }

        if (newWordMap.has(wordData.word)) {
          const currentCount = newWordMap.get(wordData.word) || 0
          console.log({
            currentCount
          })
          newWordMap.set(wordData.word, currentCount + wordData.count)
        }
      })
    })
    setWordMap(newWordMap)
  }, [])

  console.log({
    analysisResults
  })

  console.log({
    sortedData
  })

  return (
    <div className='w-full max-w-6xl mx-auto bg-white rounded-xl shadow-lg border border-gray-200 p-6'>
      <div className='mb-6'>
        <h2 className='text-2xl font-bold text-gray-800 mb-2'>{t('title')}</h2>
        <p className='text-sm text-gray-600'>{t('subtitle')}</p>
      </div>

      <div className=''>
        <h3 className='text-lg font-semibold text-gray-700 mb-4'>
          {t('wordFrequencyAnalysis')}
        </h3>
        <div className='h-96 w-full'>
          {sortedData.length > 0 && (
            <BarChart
              dataset={sortedData}
              yAxis={[
                {
                  dataKey: 'word'
                }
              ]}
              xAxis={[
                {
                  label: t('wordCount'),
                  dataKey: 'count'
                }
              ]}
              series={[
                {
                  color: 'oklch(54.6% 0.245 262.881)',
                  dataKey: 'count'
                }
              ]}
              layout='horizontal'
            />
          )}
        </div>
        <div className='flex flex-col items-center justify-center mt-8'>
          <h3 className='text-lg font-semibold text-gray-700 mb-4'>
            {t('citationsAnalysis')}
          </h3>
          <PieChart
            className='stroke-white'
            series={[
              {
                data: citations.map(item => ({
                  value: item.count,
                  label: item.year.toString()
                })),
                arcLabel: 'value'
              }
            ]}
            width={200}
            height={200}
          />
        </div>
      </div>
    </div>
  )
}
