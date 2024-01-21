'use client'


import { useState, useEffect, useRef } from 'react';
import { Box, Input, Button, VStack, Text, Flex, Spinner, ButtonGroup, IconButton } from "@chakra-ui/react";
import Cookies from "js-cookie";
import axios from 'axios'
import { issue_localLLM_post, parse_content } from './langchainUtils';
import './ChatBox.css';
import { HiArrowSmDown } from "react-icons/hi";


function post_message(message, chatID, content, setContent, setParsed, setSending) {
    const token = Cookies.get('token');
    content[0]['messages'].push({
        "type": "human",
        "data": {
            "content": message,
            "additional_kwargs": {},
            "type": "human",
            "example": false
        }
    })
    console.log('calling backend api')
    issue_localLLM_post(chatID, token, content, setContent, setParsed, setSending)
    // axios.patch(`http://localhost:8000/api/chat/chats/${chatID}/`, {
    //     content: content[0],
    // }, {
    //     headers: {
    //         Authorization: `Token ${token}`,
    //     },
    // })
    //     .then((response) => {
    //         console.log('setting content after api', response.data.content)
    //         setContent(response.data.content)
    //         setParsed(parse_content([response.data.content]))
    //         setSending(false)
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     });

}





export default function ChatBox({ chatHistory, chatID }) {
    const [isSending, setIsSending] = useState(false);
    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
    const [input, setInput] = useState('');
    const [parsed, setParsed] = useState([""]);
    const [content, setContent] = useState({})

    useEffect(scrollToBottom, [parsed, content, input]);
    useEffect(() => {
        setContent(chatHistory)
        setParsed(parse_content(chatHistory))
        scrollToBottom();
    }, []);



    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    const handleSendClick = () => {
        setIsSending(true);
        setParsed([...parsed, [input, 'human']]);
        setInput('');
        console.log('calling post_message')
        post_message(input, chatID, content, setContent, setParsed, setIsSending)
    };

    return (
        <Box w="100%" p={6} bg="gray.800" color="white" rounded="lg" shadow="lg">
            <VStack spacing={4} align="stretch" overflowY="auto" h="64" mb={4} className="chatBox">
                {parsed.map(([message, type], index) => (
                    <Box key={index} mb={4} >
                        {message && message.split('\n').map((line, i) => (
                            <Text key={i} color={type === 'human' ? 'blue.500' : 'green.500'} textAlign={type === 'ai' ? 'left' : 'right'}>{line}</Text>
                        ))}
                    </Box>
                ))}
                <div ref={messagesEndRef} />
            </VStack >
            <Flex>
            <Input
    flex="1"
    mr={2}
    py={2}
    bg="black"
    px={4}
    rounded="lg"
    border="2px"
    borderColor="blue.500"
    placeholder='Type your message here...'
    value={input}
    onChange={handleInputChange}
    size="md"
/>

<ButtonGroup size='md' isAttached variant='outline' bg="black" border="2px" borderColor="blue.500" rounded="lg">
    <Button colorScheme="blue" onClick={handleSendClick} isLoading={isSending}>
        {isSending ? <Spinner /> : 'Send'}
    </Button>
    <IconButton aria-label='edit' colorScheme='blue' icon={<HiArrowSmDown />} />
</ButtonGroup>
            </Flex>
        </Box >
    );
}