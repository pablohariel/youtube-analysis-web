import { ResponsiveCalendar } from '@nivo/calendar'
import dateFormat from "dateformat";

import styles from './styles.module.scss'

interface IProps {
  dates: string[] | undefined
}

interface IDate {
  value: number
  day: string
}

const formatDate = (date: string): string => {
  const dateObject = new Date(date)
  
  const dateFormatted = dateFormat(dateObject, 'yyyy-mm-dd')

  return dateFormatted
}

const CommentsPublicationDate: React.FC<IProps> = ({ dates }) => {
  if(dates === undefined || dates.length < 1) {
    return (
      <div className={styles.commentsPublicationDateWrapper}>
        <h3>Gráfico de calor dos comentários</h3>
        <p className={styles.noCommentsText}>Não foram econtrados comentários.</p>
      </div>
    )
  }

  const finalDate = formatDate(dates[0])
  // const initialDate = formatDate(dates[dates.length - 1])
  // const initialDate = dateFormat(new Date(new Date().getFullYear(), 0, 1), 'yyyy-mm-dd')

  const joinedDates = [] as IDate[]

  for(const date of dates) {
    const dateFormatted = formatDate(date)
    const dateObject = new Date(date)
    if(dateObject.getFullYear() === 2021) {
      let found = false
      for(let joinedDate of joinedDates) {
        if(joinedDate.day === dateFormatted) {
          joinedDate.value++
          found = true
        }
      }
      if(!found) {
        joinedDates.push({
          value: 1,
          day: dateFormatted
        })
      }
    }
  }

  const initialDate = joinedDates[0].day

  return (
    <div className={styles.commentsPublicationDateWrapper}>
      <h3 className={styles.chartTitle}>Gráfico de calor dos comentários</h3>
      <div className={styles.chart}>
        <ResponsiveCalendar
          data={joinedDates}
          from={initialDate}
          to={finalDate}
          direction={'horizontal'}
          align={'center'}
          emptyColor="#DCDEDF"
          colors={[ '#D4C2FF', '#8981D8', '#263238' ]}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          yearSpacing={60}
          monthBorderColor="#fff"
          dayBorderWidth={1}
          dayBorderColor="#fff"
          legends={[
            {
              anchor: 'bottom-right',
              direction: 'row',
              translateY: 36,
              itemCount: 4,
              itemWidth: 42,
              itemHeight: 36,
              itemsSpacing: 14,
              itemDirection: 'right-to-left'
            }
          ]}
        />
      </div>
    </div>
  )
}

export { CommentsPublicationDate }