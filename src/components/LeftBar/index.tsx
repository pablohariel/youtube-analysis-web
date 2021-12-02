import { useContext } from 'react'
import styles from './styles.module.scss'

import { Link, useHistory } from 'react-router-dom'

import { RiLoginCircleFill } from 'react-icons/ri'
import { MdHeadsetMic } from 'react-icons/md'
import { BiExit } from 'react-icons/bi'
import { AiOutlineHistory, AiOutlinePlusCircle, AiFillPlusCircle,  AiFillHome } from 'react-icons/ai'
import { BsPerson, BsHeadset, BsPersonFill } from 'react-icons/bs'

import logo from '../../assets/logo-purple.svg'
import { AuthContext, IUser } from '../../contexts/auth'

interface IParams {
  user: IUser | null
}

const LeftBar: React.FC<IParams> = ({ user }) => {
  const { signOut } = useContext(AuthContext)

  const history = useHistory()

  const { pathname } = history.location

  return (
    <div className={styles.leftBarWrapper}>
      <button className={styles.logoBtn} onClick={() => console.log('TY')}>
        <img src={logo} />
      </button>
      { user ? 
        <ul className={styles.linkList}>
          <li>
            <Link to='/' className={`${styles.link} ${pathname === '/' && styles.linkSelected}`}>  
              <AiFillHome size={'2rem'} />
              <span>Página principal</span>
            </Link>
          </li>
          <li>
            <Link to='/analysis/create' className={`${styles.link} ${pathname === '/analysis/create' && styles.linkSelected}`}>  
              <AiFillPlusCircle size={'2rem'} />
              <span>Criar análise</span>
            </Link>
          </li>
          <li>
            <Link to='/profile' className={`${styles.link} ${pathname === '/profile' && styles.linkSelected}`}>  
              <BsPersonFill size={'2rem'} />
              <span>Meu perfil</span>
            </Link>
          </li>
          <li>
            <Link to='/history' className={`${styles.link} ${pathname === '/history' && styles.linkSelected}`}>  
              <AiOutlineHistory size={'2rem'} />
              <span>Histórico</span>
            </Link>
          </li>
          <li>
            <Link to='/contact' className={`${styles.link} ${pathname === '/contact' && styles.linkSelected}`}>  
              <BsHeadset size={'2rem'} />
              <span>Entrar em contato</span>
            </Link>
          </li>
          <li>
            <button className={styles.link} onClick={() => signOut()}>  
              <BiExit size={'2rem'} />
              <span>Sair</span>
            </button>
          </li>
        </ul>
        :
        <ul className={styles.linkList}>
          <li>
            <Link to='/' className={`${styles.link} ${pathname === '/' && styles.linkSelected}`}>  
              <AiFillHome size={'2rem'} />
              <span>Página principal</span>
            </Link>
          </li>
          <li>
            <Link to='/login' className={`${styles.link}`}>  
              <RiLoginCircleFill size={'2rem'} />
              <span>Fazer login</span>
            </Link>
          </li>
          <li>
            <Link to='/contact' className={`${styles.link} ${pathname === '/contact' && styles.linkSelected}`}>  
              <BsHeadset size={'2rem'} />
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