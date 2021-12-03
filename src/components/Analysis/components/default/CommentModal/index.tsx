import { 
  Text,
  Avatar,
  Button, 
  Modal, 
  ModalBody, 
  ModalCloseButton, 
  ModalContent, 
  ModalFooter, 
  ModalHeader, 
  ModalOverlay, 
  useDisclosure 
} from "@chakra-ui/react"

import { formatDate } from '../Comment'
import { Comment, Reply } from '../../../../../interfaces/comment'

import styles from './styles.module.scss'

interface IProps {
  comment: Comment | Reply 
}

const CommentModal: React.FC<IProps> = ({ comment }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { content, author, likeCount, published_at } = comment

  return (
    <>
      <Button className={styles.btnOpenComment} onClick={onOpen}>Ver mais</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className={styles.modalTitle}>Comentário</ModalHeader>
          <ModalBody>
            <div className={styles.commentWrapper}>
              <Avatar src={author.profileImage} />
              <div className={styles.content}>
                <div className={styles.header}>
                  <span className={styles.authorName}>{author.name}</span> <span className={styles.commentDate}>{formatDate(published_at)}</span>
                </div>
                <Text className={styles.main}>{content}</Text>
                <div className={styles.footer}>
                  <span className={styles.likeCount}>{likeCount} curtidas</span>
                  {/* {'replies' in comment && <span>{comment.replyCount} respostas</span>}
                  {'replies' in comment && <RepliesModal replies={comment.replies} />} */}
                </div>
              </div>  
            </div>
          </ModalBody>
          <ModalFooter>
            <Button className={styles.btnModalClose} mr={3} onClick={onClose}>
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export { CommentModal }