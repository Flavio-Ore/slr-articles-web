interface SlrStatsProps {
  countries: { country: string; count: number }[]
  years: { year: number; count: number }[]
  words: { word: string; count: number }[]
}

export default function SlrStats ({ countries, years, words }: SlrStatsProps) {
  return (
    <div>
      <h2>SLR Stats</h2>
      <p>Some statistics about the SLR articles...</p>

      <div>
        <h3>Top Words</h3>
        <ul>
          {words.map((item, index) => (
            <li key={index}>
              {item.word}: {item.count}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
