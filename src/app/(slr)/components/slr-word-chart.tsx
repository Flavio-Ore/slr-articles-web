'use client'

import type { SlrAnalysis } from '#/schemas/slr-analysis-response.schema'
import { BarChart } from '@mui/x-charts/BarChart'

interface SlrWordChartProps {
  mostFrequentWords?: SlrAnalysis['mostFrequentWords']
  titleWords?: SlrAnalysis['titleWords']
  abstractWords?: SlrAnalysis['abstractWords']
  technicalTerms?: SlrAnalysis['technicalTerms']
}

const mockData = {
  mostFrequentWords: [
    { word: 'machine', count: 89 },
    { word: 'learning', count: 76 },
    { word: 'healthcare', count: 65 },
    { word: 'diagnosis', count: 45 },
    { word: 'treatment', count: 40 },
    { word: 'algorithm', count: 38 },
    { word: 'artificial', count: 35 },
    { word: 'intelligence', count: 32 },
    { word: 'neural', count: 28 },
    { word: 'network', count: 25 }
  ],
  titleWords: [
    'Machine',
    'Learning',
    'Healthcare',
    'Comprehensive',
    'Review',
    'Artificial',
    'Intelligence',
    'Medical'
  ],
  abstractWords: [
    'machine',
    'learning',
    'healthcare',
    'diagnosis',
    'treatment',
    'accuracy',
    'algorithm',
    'artificial',
    'intelligence',
    'neural'
  ],
  technicalTerms: [
    'CNN',
    'RNN',
    'SVM',
    'Random Forest',
    'Deep Learning',
    'NLP',
    'Computer Vision',
    'Transformer'
  ]
}

export default function SlrWordChart ({
  mostFrequentWords = mockData.mostFrequentWords,
  titleWords = mockData.titleWords,
  abstractWords = mockData.abstractWords,
  technicalTerms = mockData.technicalTerms
}: SlrWordChartProps) {
  const sortedData = [...mostFrequentWords].sort((a, b) => b.count - a.count)

  const chartXAxisData = sortedData.map(item => item.word)
  const chartSeriesData = sortedData.map(item => item.count)

  return (
    <div className='w-full max-w-6xl mx-auto bg-white rounded-xl shadow-lg border border-gray-200 p-6'>
      <div className='mb-6'>
        <h2 className='text-2xl font-bold text-gray-800 mb-2'>
          Research Analysis Dashboard
        </h2>
        <p className='text-sm text-gray-600'>
          Most frequent words and key terms from research articles
        </p>
      </div>

      <div className=''>
        <h3 className='text-lg font-semibold text-gray-700 mb-4'>
          Word Frequency Analysis
        </h3>
        <div className='h-80 w-full'>
          <BarChart
            xAxis={[
              {
                id: 'wordCategories',
                data: chartXAxisData,
                scaleType: 'band',
                label: 'Words',
                labelStyle: { fontSize: 12, fontWeight: 'bold' }
              }
            ]}
            yAxis={[
              {
                label: 'Frequency Count',
                labelStyle: { fontSize: 12, fontWeight: 'bold' }
              }
            ]}
            series={[
              {
                data: chartSeriesData,
                label: 'Word Count',
                color: 'oklch(54.6% 0.245 262.881)'
              }
            ]}
            grid={{ horizontal: true, vertical: false }}
            margin={{ left: 80, right: 80, top: 20, bottom: 60 }}
            height={300}
          />
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <div className='bg-blue-50 rounded-lg p-4 border border-blue-200'>
          <h4 className='font-semibold text-blue-800 mb-2'>Title Keywords</h4>
          <div className='flex flex-wrap gap-2'>
            {titleWords.map((word, index) => (
              <span
                key={index}
                className='px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium'
              >
                {word}
              </span>
            ))}
          </div>
        </div>

        <div className='bg-green-50 rounded-lg p-4 border border-green-200'>
          <h4 className='font-semibold text-green-800 mb-2'>Abstract Terms</h4>
          <div className='flex flex-wrap gap-2'>
            {abstractWords.slice(0, 6).map((word, index) => (
              <span
                key={index}
                className='px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium'
              >
                {word}
              </span>
            ))}
          </div>
        </div>

        <div className='bg-purple-50 rounded-lg p-4 border border-purple-200'>
          <h4 className='font-semibold text-purple-800 mb-2'>
            Technical Terms
          </h4>
          <div className='flex flex-wrap gap-2'>
            {technicalTerms.map((term, index) => (
              <span
                key={index}
                className='px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium'
              >
                {term}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
