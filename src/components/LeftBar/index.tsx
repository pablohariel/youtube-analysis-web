import { useContext, useState } from 'react'
import styles from './styles.module.scss'

import { Link } from 'react-router-dom'

import { ImArrowRight2, ImArrowLeft2 } from 'react-icons/im'
import { RiLoginCircleFill } from 'react-icons/ri'
import { MdHeadsetMic } from 'react-icons/md'
import { BiExit } from 'react-icons/bi'
import { AiFillPlusCircle, AiOutlineHistory, AiOutlineHome, AiOutlinePlusCircle } from 'react-icons/ai'
import { IoMdPerson } from 'react-icons/io'
import { BsPerson, BsHeadset } from 'react-icons/bs'

import { AuthContext, IUser } from '../../contexts/auth'

interface IParams {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  user: IUser | null
}

const LeftBar: React.FC<IParams> = ({ open, setOpen, user }) => {
  const { signOut } = useContext(AuthContext)

  return (
    <div className={open ? styles.leftBarWrapperOpen : styles.leftBarWrapperClosed }>
      <button className={styles.arrowBtn} onClick={() => setOpen(!open)}>
        {open ? <ImArrowLeft2 size={'2rem'} /> : <ImArrowRight2 size={'2rem'} />}
      </button>
      { user ? 
        <ul className={styles.linkList}>
          <li>
            <Link to='/' className={styles.link}>  
              <AiOutlineHome size={'2.5rem'} />
              <span>Página principal</span>
            </Link>
          </li>
          <li>
            <Link to='/' className={styles.link}>  
              <AiOutlinePlusCircle size={'2.5rem'} />
              <span>Criar análise</span>
            </Link>
          </li>
          <li>
            <Link to='/profile' className={styles.link}>  
              <BsPerson size={'2.5rem'} />
              <span>Meu perfil</span>
            </Link>
          </li>
          <li>
            <Link to='/history' className={styles.link}>  
              <AiOutlineHistory size={'2.5rem'} />
              <span>Histórico</span>
            </Link>
          </li>
          <li>
            <Link to='' className={styles.link}>  
              <BsHeadset size={'2.5rem'} />
              <span>Entrar em contato</span>
            </Link>
          </li>
          <li>
            <button className={styles.link} onClick={() => signOut()}>  
              <BiExit size={'2.5rem'} />
              <span>Sair</span>
            </button>
          </li>
        </ul>
        :
        <ul className={styles.linkList}>
          <li>
            <Link to='/login' className={styles.link}>  
              <RiLoginCircleFill size={'2.5rem'} />
              <span>Fazer login</span>
            </Link>
          </li>
          <li>
            <Link to='/' className={styles.link}>  
              <MdHeadsetMic size={'2.5rem'} />
              <span>Entrar em contato</span>
            </Link>
          </li>

          <div className={styles.divider} />
        </ul>
      }
      
    </div>
  )
}

export { LeftBar }