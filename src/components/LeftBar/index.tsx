import { useContext } from 'react'
import { Tooltip } from '@chakra-ui/react'
import { Link, useHistory } from 'react-router-dom'
import { RiLoginCircleFill } from 'react-icons/ri'
import { BiExit } from 'react-icons/bi'
import { AiOutlineHistory, AiOutlinePlusCircle, AiFillPlusCircle,  AiFillHome } from 'react-icons/ai'
import { BsPerson, BsHeadset, BsPersonFill } from 'react-icons/bs'

import { AuthContext, IUser } from '../../contexts/auth'
import logo from '../../assets/logo-purple.svg'

import styles from './styles.module.scss'

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
          <Tooltip label='Página inicial' placement='right' hasArrow bg='newPurple.500'>
            <Link to='/' className={`${styles.link} ${pathname === '/' && styles.linkSelected}`}>  
                <AiFillHome size={'2rem'} />
                <span>Página principal</span>
            </Link>
          </Tooltip>
          </li>
          <li>
            <Tooltip label='Criar análise' placement='right' hasArrow bg='newPurple.500'>
              <Link to='/analysis/create' className={`${styles.link} ${pathname === '/analysis/create' && styles.linkSelected}`}>  
                <AiFillPlusCircle size={'2rem'} />
                <span>Criar análise</span>
              </Link>
            </Tooltip>
          </li>
          <li>
            <Tooltip label='Perfil' placement='right' hasArrow bg='newPurple.500'>
              <Link to='/profile' className={`${styles.link} ${pathname === '/profile' && styles.linkSelected}`}>  
                <BsPersonFill size={'2rem'} />
                <span>Meu perfil</span>
              </Link>
            </Tooltip>
          </li>
          <li>
            <Tooltip label='Histórico' placement='right' hasArrow bg='newPurple.500'>
              <Link to='/history' className={`${styles.link} ${pathname === '/history' && styles.linkSelected}`}>  
                <AiOutlineHistory size={'2rem'} />
                <span>Histórico</span>
              </Link>
            </Tooltip>
          </li>
          <li>
            <Tooltip label='Entrar em contato' placement='right' hasArrow bg='newPurple.500'>
              <Link to='/contact' className={`${styles.link} ${pathname === '/contact' && styles.linkSelected}`}>  
                <BsHeadset size={'2rem'} />
                <span>Entrar em contato</span>
              </Link>
            </Tooltip>
          </li>
          <li>
            <Tooltip label='Sair' placement='right' hasArrow bg='newPurple.500'>
              <button className={styles.link} onClick={() => signOut()}>  
                <BiExit size={'2rem'} />
                <span>Sair</span>
              </button>
            </Tooltip>
          </li>
        </ul>
        :
        <ul className={styles.linkList}>
          <li>
            <Tooltip label='Página inicial' placement='right' hasArrow bg='newPurple.500'>
              <Link to='/' className={`${styles.link} ${pathname === '/' && styles.linkSelected}`}>  
                <AiFillHome size={'2rem'} />
                <span>Página principal</span>
              </Link>
            </Tooltip>
          </li>
          <li>
            <Tooltip label='Entrar' placement='right' hasArrow bg='newPurple.500'>
              <Link to='/login' className={`${styles.link}`}>  
                <RiLoginCircleFill size={'2rem'} />
                <span>Fazer login</span>
              </Link>
            </Tooltip>
          </li>
          <li>
            <Tooltip label='Entrar em contato' placement='right' hasArrow bg='newPurple.500'>
              <Link to='/contact' className={`${styles.link} ${pathname === '/contact' && styles.linkSelected}`}>  
                <BsHeadset size={'2rem'} />
                <span>Entrar em contato</span>
              </Link>
            </Tooltip>
          </li>

          <div className={styles.divider} />
        </ul>
      }
    </div>
  )
}

export { LeftBar }