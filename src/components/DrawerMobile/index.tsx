import { Dispatch, SetStateAction, useContext, useRef } from 'react'
import { 
  Drawer,
  Button, 
  DrawerBody, 
  DrawerCloseButton, 
  DrawerContent, 
  DrawerFooter, 
  DrawerHeader, 
  DrawerOverlay, 
  Input, 
  useDisclosure 
} from "@chakra-ui/react"
import { HamburgerIcon } from '@chakra-ui/icons'
import { Link, useHistory } from 'react-router-dom'
import { AiFillHome, AiFillPlusCircle, AiOutlineHistory } from 'react-icons/ai'
import { BsHeadset, BsPersonFill } from 'react-icons/bs'
import { BiExit } from 'react-icons/bi'
import { RiLoginCircleFill, RiSearch2Line } from 'react-icons/ri'

import { AuthContext, IUser } from '../../contexts/auth'

import styles from './styles.module.scss'


interface IProps {
  user: IUser | null
  search: string
  setSearch: Dispatch<SetStateAction<string>>
}

const DrawerMobile: React.FC<IProps> = ({ user, search, setSearch }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef() as any

  const { signOut } = useContext(AuthContext)

  const history = useHistory()

  const { pathname } = history.location

  return (
    <>
      <Button className={styles.btnBurger} onClick={onOpen}>
        <HamburgerIcon />
      </Button>

      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        colorScheme='purple'
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent className={styles.drawerWrapper}>

          <DrawerBody className={styles.main}>
            <div className={styles.searchBarWrapper}>
              <Link to={`/search?query=${search}`}><RiSearch2Line size={'2rem'} /></Link>
              <Input className={styles.input} placeholder='Pesquisar análise...'  />
            </div>
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
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export { DrawerMobile }