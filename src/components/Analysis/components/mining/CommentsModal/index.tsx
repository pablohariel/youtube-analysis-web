import { useRef, useState } from 'react'
import { Comment as IComment, Reply as IReply } from '../../../../../interfaces/comment'
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
import { Comment } from '../Comment'

interface IProps {
  comments: (IComment | IReply)[]
}

const CommentsModal: React.FC<IProps> = ({ comments }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [scrollBehavior, setScrollBehavior] = useState<any>("")

  const btnRef = useRef() as any

  return (
    <>
      <Button mt={3} ref={btnRef} onClick={onOpen}>
        Ver comentários
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
            {comments.map((comment, i) => <Comment key={i} comment={comment} />)}
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export { CommentsModal }