import { Slider, SliderFilledTrack, SliderThumb, SliderTrack } from "@chakra-ui/react"
import { ImStarFull, ImStarHalf, ImStarEmpty } from 'react-icons/im'
import { CommentsGroupedByPolarityNoComments } from "../../../../../interfaces/comment"
import { Tooltip } from '@chakra-ui/react'

import styles from './styles.module.scss'

interface IProps {
  commentsPolarity: CommentsGroupedByPolarityNoComments | undefined
}

const CommentsPolarity: React.FC<IProps> = ({ commentsPolarity }) => {

  if(commentsPolarity === undefined) {
    return (
      <div className={styles.commentsPolarityWrapper}>
        <h3>Polaridade dos comentários</h3>
        <p>Análise de polaridade não encontrada.</p>
      </div>
    )
  }

  const { positive, neutral, negative } = commentsPolarity

  const commentCount = positive.totalCount + neutral.totalCount + negative.totalCount
  const positiveCalc = Math.round((positive.totalCount / commentCount) * 100)
  const neutralCalc = Math.round((neutral.totalCount / commentCount) * 100)
  const negativeCalc = Math.round((negative.totalCount / commentCount) * 100)

  const getStarts = () => {
    const totalValid = positive.totalCount + negative.totalCount
    const rating = (positive.totalCount / totalValid) * 5

    if(rating >= 0 && rating <= 0.5) {
      return <div className={styles.ratingWrapper}>
        <span className={styles.ratingNumber}>0</span>
        <div className={styles.starsWrapper}>
          <div className={styles.stars}>
            <ImStarEmpty className={styles.star} size={'1.75rem'} />
            <ImStarEmpty className={styles.star} size={'1.75rem'} />
            <ImStarEmpty className={styles.star} size={'1.75rem'} />
            <ImStarEmpty className={styles.star} size={'1.75rem'} />
            <ImStarEmpty className={styles.star} size={'1.75rem'} />
          </div>
          <p className={styles.result}>Baseado em {totalValid} comentários</p>
        </div>
      </div>
    } else if(rating > 0.5 && rating <= 1) {
      return <div className={styles.ratingWrapper}>
        <span className={styles.ratingNumber}>0.5</span>
        <div className={styles.starsWrapper}>
          <div className={styles.stars}>
            <ImStarHalf className={styles.star} size={'1.75rem'} />
            <ImStarEmpty className={styles.star} size={'1.75rem'} />
            <ImStarEmpty className={styles.star} size={'1.75rem'} />
            <ImStarEmpty className={styles.star} size={'1.75rem'} />
            <ImStarEmpty className={styles.star} size={'1.75rem'} />
          </div>
          <p className={styles.result}>Baseado em {totalValid} comentários</p>
        </div>
      </div>
    } else if(rating > 1 && rating <= 1.5) {
      return <div className={styles.ratingWrapper}>
        <span className={styles.ratingNumber}>1</span>
        <div className={styles.starsWrapper}>
          <div className={styles.stars}>
            <ImStarFull className={styles.star} size={'1.75rem'} />
            <ImStarEmpty className={styles.star} size={'1.75rem'} />
            <ImStarEmpty className={styles.star} size={'1.75rem'} />
            <ImStarEmpty className={styles.star} size={'1.75rem'} />
            <ImStarEmpty className={styles.star} size={'1.75rem'} />
          </div>
          <p className={styles.result}>Baseado em {totalValid} comentários</p>
        </div>
      </div>
    } else if(rating > 1.5 && rating <= 2) {
      return <div className={styles.ratingWrapper}>
        <span className={styles.ratingNumber}>1.5</span>
        <div className={styles.starsWrapper}>
          <div className={styles.stars}></div>
          <div className={styles.stars}>
            <ImStarFull className={styles.star} size={'1.75rem'} />
            <ImStarHalf className={styles.star} size={'1.75rem'} />
            <ImStarEmpty className={styles.star} size={'1.75rem'} />
            <ImStarEmpty className={styles.star} size={'1.75rem'} />
            <ImStarEmpty className={styles.star} size={'1.75rem'} />
          </div>
          <p className={styles.result}>Baseado em {totalValid} comentários</p>
        </div>
      </div>
    } else if(rating > 2 && rating <= 2.5) {
      return <div className={styles.ratingWrapper}>
        <span className={styles.ratingNumber}>2</span>
        <div className={styles.starsWrapper}>
          <div className={styles.stars}>
            <ImStarFull className={styles.star} size={'1.75rem'} />
            <ImStarFull className={styles.star} size={'1.75rem'} />
            <ImStarEmpty className={styles.star} size={'1.75rem'} />
            <ImStarEmpty className={styles.star} size={'1.75rem'} />
            <ImStarEmpty className={styles.star} size={'1.75rem'} />
          </div>
          <p className={styles.result}>Baseado em {totalValid} comentários</p>
        </div>
      </div>
    } else if(rating > 2.5 && rating <= 3) {
      return <div className={styles.ratingWrapper}>
        <span className={styles.ratingNumber}>2.5</span>
        <div className={styles.starsWrapper}>
          <div className={styles.stars}>
            <ImStarFull className={styles.star} size={'1.75rem'} />
            <ImStarFull className={styles.star} size={'1.75rem'} />
            <ImStarHalf className={styles.star} size={'1.75rem'} />
            <ImStarEmpty className={styles.star} size={'1.75rem'} />
            <ImStarEmpty className={styles.star} size={'1.75rem'} />
          </div>
          <p className={styles.result}>Baseado em {totalValid} comentários</p>
        </div>
      </div>
    } else if(rating > 3 && rating <= 3.5) {
      return <div className={styles.ratingWrapper}>
        <span className={styles.ratingNumber}>3</span>
        <div className={styles.starsWrapper}>
          <div className={styles.stars}>
            <ImStarFull className={styles.star} size={'1.75rem'} />
            <ImStarFull className={styles.star} size={'1.75rem'} />
            <ImStarFull className={styles.star} size={'1.75rem'} />
            <ImStarEmpty className={styles.star} size={'1.75rem'} />
            <ImStarEmpty className={styles.star} size={'1.75rem'} />
          </div>
          <p className={styles.result}>Baseado em {totalValid} comentários</p>
        </div>
      </div>
    } else if(rating > 3.5 && rating <= 4) {
      return <div className={styles.ratingWrapper}>
        <span className={styles.ratingNumber}>3.5</span>
        <div className={styles.starsWrapper}>
          <div className={styles.stars}>
            <ImStarFull className={styles.star} size={'1.75rem'} />
            <ImStarFull className={styles.star} size={'1.75rem'} />
            <ImStarFull className={styles.star} size={'1.75rem'} />
            <ImStarHalf className={styles.star} size={'1.75rem'} />
            <ImStarEmpty className={styles.star} size={'1.75rem'} />
          </div>
          <p className={styles.result}>Baseado em {totalValid} comentários</p>
        </div>
      </div>
    } else if(rating > 4 && rating <= 4.5) {
      return <div className={styles.ratingWrapper}>
        <span className={styles.ratingNumber}>4</span>
        <div className={styles.starsWrapper}>
          <div className={styles.stars}>
            <ImStarFull className={styles.star} size={'1.75rem'} />
            <ImStarFull className={styles.star} size={'1.75rem'} />
            <ImStarFull className={styles.star} size={'1.75rem'} />
            <ImStarFull className={styles.star} size={'1.75rem'} />
            <ImStarEmpty className={styles.star} size={'1.75rem'} />
          </div>
          <p className={styles.result}>Baseado em {totalValid} comentários</p>
        </div>
      </div>
    } else if(rating > 4.5 && rating <= 5) {
      return <div className={styles.ratingWrapper}>
        <span className={styles.ratingNumber}>4.5</span>
        <div className={styles.starsWrapper}>
          <div className={styles.stars}>
            <ImStarFull className={styles.star} size={'1.75rem'} />
            <ImStarFull className={styles.star} size={'1.75rem'} />
            <ImStarFull className={styles.star} size={'1.75rem'} />
            <ImStarFull className={styles.star} size={'1.75rem'} />
            <ImStarHalf className={styles.star} size={'1.75rem'} />
          </div>
          <p className={styles.result}>Baseado em {totalValid} comentários</p>
        </div>
      </div>
    } else {
      return <div className={styles.ratingWrapper}>
        <span className={styles.ratingNumber}>5</span>
        <div className={styles.starsWrapper}>
          <div className={styles.stars}>
            <ImStarFull className={styles.star} size={'1.75rem'} />
            <ImStarFull className={styles.star} size={'1.75rem'} />
            <ImStarFull className={styles.star} size={'1.75rem'} />
            <ImStarFull className={styles.star} size={'1.75rem'} />
            <ImStarFull className={styles.star} size={'1.75rem'} />
          </div>
          <p className={styles.result}>Baseado em {totalValid} comentários</p>
        </div>
      </div>
    }
  }

  return (
    <div className={styles.commentsPolarityWrapper}>
      <h3>Polaridade dos comentários</h3>
      <div className={styles.main}>
        <div>
          {getStarts()}
        </div>
        <div className={styles.polarities}>
          <Tooltip label={`${positive.totalCount} comentários`}>
            <div className={styles.polarity}>
              <span className={styles.polarityName}>Bom</span>
              <Slider aria-label='slider-ex-2' colorScheme='polarityGood' defaultValue={positiveCalc} isReadOnly isDisabled >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
              </Slider>
            </div>
          </Tooltip>
          <Tooltip label={`${neutral.totalCount} comentários`}>
            <div className={styles.polarity}>
              <span className={styles.polarityName}>Neutro</span> 
              <Slider aria-label='slider-ex-2' colorScheme='polarityNeutral' defaultValue={neutralCalc} isReadOnly isDisabled >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
            </Slider>
            </div>
          </Tooltip>
          <Tooltip label={`${negative.totalCount} comentários`}>
            <div className={styles.polarity}>
              <span className={styles.polarityName}>Ruim</span>
                <Slider aria-label='slider-ex-2' colorScheme='polarityNegative' defaultValue={negativeCalc} isReadOnly isDisabled className={styles.slider} >
                  <SliderTrack >
                    <SliderFilledTrack />
                  </SliderTrack>
                </Slider>
            </div>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}

export { CommentsPolarity }