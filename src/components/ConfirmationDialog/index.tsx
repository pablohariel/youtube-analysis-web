import { useRef } from 'react'
import { 
  AlertDialog, 
  AlertDialogOverlay, 
  AlertDialogContent, 
  AlertDialogHeader, 
  AlertDialogCloseButton, 
  AlertDialogBody, 
  AlertDialogFooter,
  Button
} from '@chakra-ui/react'

interface IProps {
  isOpen: boolean,
  onClose: () => void
}

const ConfirmationDialog: React.FC<IProps> = ({ isOpen, onClose }) => {
  const cancelRef = useRef<any>() 

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
    <AlertDialogOverlay />

    <AlertDialogContent>
      <AlertDialogHeader>Mensagem enviada com sucesso!</AlertDialogHeader>
      <AlertDialogCloseButton />
      <AlertDialogBody>
        Assim que possível será realizado o retorno através do e-mail informado.
      </AlertDialogBody>
      <AlertDialogFooter>
        <Button ref={cancelRef} onClick={onClose}>
          Fechar
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  )
}

export { ConfirmationDialog }