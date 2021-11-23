import { useRef } from 'react'
import { 
  Input, 
  ModalCloseButton, 
  Button, 
  useDisclosure, 
  Modal, 
  ModalOverlay, 
  ModalContent, 
  ModalHeader,
  ModalBody,
  FormControl,
  FormLabel,
  ModalFooter
} from '@chakra-ui/react'

import styles from './styles.module.scss'

interface IProps {
  handleDelete: () => void
  passwordToDelete: string
  setPasswordToDelete: React.Dispatch<React.SetStateAction<string>>
}

const DeleteAccountBtn: React.FC<IProps> = ({ handleDelete, passwordToDelete, setPasswordToDelete }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = useRef() as any
  const finalRef = useRef() as any

  return (
    <>
      <Button className={styles.btnDeleteAccount} onClick={onOpen}>Deletar</Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Deletar conta</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Senha</FormLabel>
              <Input ref={initialRef} type='password' value={passwordToDelete} onChange={e => setPasswordToDelete(e.target.value)} placeholder="Digite sua senha" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} colorScheme="blue" mr={3}>
              Cancelar
            </Button>
            <Button onClick={handleDelete}>Deletar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export { DeleteAccountBtn }