import { useRef, useState } from 'react'
import { Reply as IReply } from '../../../../../interfaces/comment'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button
} from "@chakra-ui/react"
import { Reply } from '../Reply'

interface IProps {
  replies: IReply[]
}

const RepliesModal: React.FC<IProps> = ({ replies }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [scrollBehavior, setScrollBehavior] = useState<any>("")

  const btnRef = useRef() as any

  console.log(replies.length)

  return (
    <>
      <Button mt={3} ref={btnRef} onClick={onOpen}>
        Ver
      </Button>

      <Modal
        onClose={onClose}
        finalFocusRef={btnRef}
        isOpen={isOpen}
        scrollBehavior={scrollBehavior}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Respostas</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {replies.map((reply, i) => <Reply key={i} reply={reply} />)}
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export { RepliesModal }