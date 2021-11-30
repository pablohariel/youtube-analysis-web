import { 
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

import {
  EmailShareButton,
  FacebookShareButton,
  HatenaShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon
} from "react-share";

import styles from './styles.module.scss'

const ShareModal: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button className={styles.btnShare} onClick={onOpen}>Compartilhar</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className={styles.modalTitle}>Compartilhar</ModalHeader>
          <ModalBody>
            <div className={styles.socialMediaBtns}>
              <div className={styles.btnFacebook}>
                <FacebookShareButton 
                  disabled
                  url={""}
                  quote={""}
                  hashtag={"#hashtag"}
                  className=""
                >
                  <FacebookIcon size={32} round /> 
                </FacebookShareButton>
                <span className={styles.text}>Facebook</span>
              </div>
              
              <div className={styles.btnTwitter}>
                <TwitterShareButton 
                  disabled
                  url={""}
                  className=""
                >
                  <TwitterIcon size={32} round /> 
                </TwitterShareButton>
                <span className={styles.text}>Twitter</span>
              </div>

              <div className={styles.btnWhatsapp}>
                <WhatsappShareButton 
                  disabled
                  url={""}
                  className=""
                >
                  <WhatsappIcon size={32} round /> 
                </WhatsappShareButton>
                <span className={styles.text}>WhatsApp</span>
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

export { ShareModal }