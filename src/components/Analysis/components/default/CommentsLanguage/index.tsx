import { ResponsiveBar } from '@nivo/bar'

import { LanguagesCount } from '../../../../../interfaces/languages'

import styles from './styles.module.scss'

interface IProps {
  languages: LanguagesCount | undefined 
}

const CommentsLanguage: React.FC<IProps> = ({ languages }) => {
  if(languages === undefined) {
    return (
      <div className={styles.commentsLanguageWrapper}>
        <h3>Idioma dos comentários</h3>
        <p className={styles.noCommentsText}>Idioma dos comentários não encontrado.</p>
      </div>
    )
  }

  const { pt, en, es, fr, ru, notFound } = languages

  const wordsToString = ['português', 'inglês', 'espanhol', 'francês', 'russo', 'desconhecido']

  const data = [
    {
      'language': 'português',
      'português': pt.count,
    },
    {
      'language': 'inglês',
      'inglês': en.count,
    },
    {
      'language': 'espanhol',
      'espanhol': es.count,
    },
    {
      'language': 'francês',
      'francês': fr.count,
    },
    {
      'language': 'russo',
      'russo': ru.count,
    },
    {
      'language': 'desconhecido',
      'desconhecido': notFound.count,
    }
  ]

  return (
    <div className={styles.commentsLanguageWrapper}>
      <h3>Idioma dos comentários</h3>
      <div className={styles.chart}>
          <ResponsiveBar
            data={data as any}
            keys={[...wordsToString]}
            indexBy="language"
            margin={{ top: 50, right: 100, bottom: 50, left: 0 }}
            padding={0.3}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={['#855CF8', '#865cf8d1', '#865cf8ba', '#865cf884', '#865cf86f', '#865cf844']}
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

export { CommentsLanguage }