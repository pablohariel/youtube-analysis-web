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

const ErrorDialog: React.FC<IProps> = ({ isOpen, onClose }) => {
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
      <AlertDialogHeader>Não foi possível enviar mensagem!</AlertDialogHeader>
      <AlertDialogCloseButton />
      <AlertDialogBody>
        Revise os dados e tente novamente.
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

export { ErrorDialog }