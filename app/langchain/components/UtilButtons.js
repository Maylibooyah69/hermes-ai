import { AddIcon, DeleteIcon, TriangleDownIcon } from '@chakra-ui/icons'

import {
    Modal, IconButton, Button,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,FormControl,FormLabel,Input,
    ModalCloseButton, useDisclosure,FormHelperText,
} from '@chakra-ui/react'
import { useRef } from 'react'
import {create_localLLM_chat,delete_localLLM_chat} from './langchainUtils'



function NewChatButton({token}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = useRef(null)
  const finalRef = useRef(null)
    return (
        <>
            <IconButton onClick={onOpen} aria-label='create new chat' icon={<AddIcon />} ml={4} />

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Creating a new chat</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Chat Title</FormLabel>
                            <Input ref={initialRef} placeholder='enter title here' required/>
                            <FormHelperText color="red.500">Required</FormHelperText>
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Chat Summary</FormLabel>
                            <Input placeholder='skip to get automatic summary later' defaultValue={''}/>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button colorScheme='green' onClick={()=>create_localLLM_chat(token,initialRef.current.value)}>Create</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

function DeleteChatButton({token,chatID}){

    return <IconButton onClick={()=>{}} aria-label='delete current chat' icon={<DeleteIcon />} ml={4} />
}

export { NewChatButton, DeleteChatButton }