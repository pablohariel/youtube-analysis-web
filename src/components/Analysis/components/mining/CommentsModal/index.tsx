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
import { Comment } from '../../default/Comment'

import styles from './styles.module.scss'

interface IProps {
  comments: (IComment | IReply)[]
}

const CommentsModal: React.FC<IProps> = ({ comments }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [scrollBehavior, setScrollBehavior] = useState<any>("")

  const btnRef = useRef() as any

  return (
    <>
      <Button mt={3} ref={btnRef} className={styles.btnOpenComments} onClick={onOpen}>
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
          <ModalHeader className={styles.modalTitle}>Comentários</ModalHeader>
          <ModalBody className={styles.commentList}>
            {comments.map((comment, i) => <div key={i} className={styles.comment}><Comment comment={comment} /></div>)}
          </ModalBody>
          <ModalFooter>
            <Button className={styles.btnModalClose} onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export { CommentsModal }