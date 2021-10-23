import { useState } from 'react'
import styles from './styles.module.scss'

import { Link } from 'react-router-dom'

import { ImArrowRight2, ImArrowLeft2 } from 'react-icons/im'
import { RiLoginCircleFill } from 'react-icons/ri'
import { MdHeadsetMic } from 'react-icons/md'

interface IParams {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const LeftBar: React.FC<IParams> = ({ open, setOpen }) => {
  return (
    <div className={open ? styles.leftBarWrapperOpen : styles.leftBarWrapperClosed }>
      <button className={styles.arrowBtn} onClick={() => setOpen(!open)}>
        {open ? <ImArrowLeft2 size={'2rem'} /> : <ImArrowRight2 size={'2rem'} />}
      </button>
      <ul className={styles.linkList}>
        <li>
          <Link to='/login' className={styles.link}>  
            <RiLoginCircleFill size={'2.5rem'} />
            <span>Fazer login</span>
          </Link>
        </li>
       
        <li>
          <Link to='' className={styles.link}>  
            <MdHeadsetMic size={'2.5rem'} />
            <span>Entrar em contato</span>
          </Link>
        </li>

        <div className={styles.divider} />
      </ul>
    </div>
  )
}

export { LeftBar }