import { ResponsiveBar } from '@nivo/bar'

import { JoinedWord } from "../../../../../interfaces/word"

import styles from './styles.module.scss'

interface IProps {
  words: JoinedWord[] | undefined
}

const TopWords: React.FC<IProps> = ({ words }) => {

  if(words === undefined) {
    return (
      <div className={styles.topWordsWrapper}>
        <h3>Principais palavras</h3>
        <p>Principais palavras não encontradas.</p>
      </div>
    )
  }

  const topWords = words.slice(0, 5)

  const wordsToString = topWords.map(w => w.content)

  const data = [
    {
      'word': words[0].content,
      [words[ 0].content]: words[0].timesUsed,
    },
    {
      'word': words[1].content,
      [words[1].content]: words[1].timesUsed,
    },
    {
      'word': words[2].content,
      [words[2].content]: words[2].timesUsed,
    },
    {
      'word': words[3].content,
      [words[3].content]: words[3].timesUsed,
    },
    {
      'word': words[4].content,
      [words[4].content]: words[4].timesUsed,
    }
  ]

  return (
    <div className={styles.topWordsWrapper}>
      <h3>Principais palavras</h3>
      <div className={styles.chart}>
        <ResponsiveBar
          data={data}
          keys={[...wordsToString]}
          indexBy="word"
          margin={{ top: 50, right: 100, bottom: 50, left: 0 }}
          padding={0.3}
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          colors={['#855CF8', '#865cf8d1', '#865cf8ba', '#865cf884', '#865cf86f']}
          colorBy="id"
          borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
          axisTop={null}
          axisRight={null}
          axisLeft={null}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: 'color', modifiers: [ [ 'brighter', 10 ] ] }}
          legends={[
            {
              dataFrom: 'keys',
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: 'left-to-right',
              itemOpacity: 0.85,
              symbolSize: 20,
              symbolShape: 'circle',
              itemTextColor: '#34495E',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemOpacity: 1
                  }
                }
              ]
            }
          ]}
          role="application"
          ariaLabel="Nivo bar chart demo"
          barAriaLabel={function(e){return e.id+": "+e.formattedValue+" in country: "+e.indexValue}}
        />
      </div>
    </div>
  )
}

export { TopWords }