import { ResponsivePie } from '@nivo/pie'

import { WordRelatedToVideoTitle } from '../../../../../interfaces/wordRelatedToVideoTitle'

import styles from './styles.module.scss'

interface IProps {
  words: WordRelatedToVideoTitle[] | undefined
}

const WordsRelatedToVideoTitle: React.FC<IProps> = ({ words }) => {

  if(words === undefined || words.length < 1) {
    return (
      <div className={styles.wordsRelatedToVideoTitleWrapper}>
        <h3>Palavras relacionadas ao titulo do vídeo</h3>
        <p className={styles.noWordsText}>Não foram encontradas palavras.</p>
      </div>
    )
  }

  const topWords = words.slice(0, 5)

  const data = topWords.map(word => {
    return {
      'id': word.word.toLowerCase(),
      'label': word.word.toLowerCase(),
      'value': word.timesUsed,
      'color': '#8981D8'
    }
  })

  return (
    <div className={styles.wordsRelatedToVideoTitleWrapper}>
      <h3>Palavras relacionadas ao titulo do vídeo</h3>
      <div className={styles.chart}>
        <ResponsivePie
          data={data}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          colors={['#855CF8', '#865cf8d1', '#865cf8ba', '#865cf884', '#865cf86f']}
          borderWidth={1}
          borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#34495E"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: 'color' }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{ from: 'color', modifiers: [ [ 'brighter', 10 ] ] }}
          legends={[
            {
              anchor: 'bottom',
              direction: 'row',
              justify: false,
              translateX: 0,
              translateY: 56,
              itemsSpacing: 30,
              itemWidth: 40,
              itemHeight: 18,
              itemTextColor: '#34495E',
              itemDirection: 'left-to-right',
              itemOpacity: 1,
              symbolSize: 18,
              symbolShape: 'circle',
            }
          ]}
        />
      </div>
    </div>
  )
}

export { WordsRelatedToVideoTitle }