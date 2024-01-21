'use client'
import React, { use, useState } from 'react';
import ChatBox from './ChatBox';
import { useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { Tabs, TabList, TabPanels, Tab, TabPanel, ChakraProvider, extendTheme, Box, IconButton } from "@chakra-ui/react";
import { NewChatButton } from './UtilButtons';
import { HiOutlineTrash } from "react-icons/hi";
import {delete_localLLM_chat} from './langchainUtils'


const chatTheme = extendTheme({
    colors: {
        brand: {
            500: "#3D3D3D", // This is an example. Replace it with your actual color code.
        },
    },
});


export default function ChatTabs() {
    const [isClient, setIsClient] = useState(false)
    const [chats, setChats] = useState([]);
    const [token, setToken] = useState(Cookies.get('token'));
    useEffect(() => {
        setIsClient(true)

        axios.get('http://localhost:8000/api/chat/chats/', {
            headers: {
                Authorization: `Token ${token}`,
            },
        })
            .then((response) => {
                console.log(response.data);
                setChats(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])

    return (
        isClient ?
            <ChakraProvider theme={chatTheme}>
                < Box width="80%" margin="auto" >
                    <Tabs variant='soft-rounded' colorScheme='green'>
                        <TabList mb="1em">
                            {chats.map((chat, index) => (
                                <Tab key={index} _selected={{ color: "white", bg: "brand.500" }}>
                                    {chat.title}
                                    <IconButton onClick={() => {delete_localLLM_chat(token,chat.id)}} aria-label='delete current chat' icon={<HiOutlineTrash />} ml={4} ></IconButton>
                                </Tab>
                                
                            ))}
                            <NewChatButton ml={4} token={token} />
                        </TabList>

                        <TabPanels>
                            {chats.map((chat, index) => (
                                <TabPanel key={index} w='100%'>
                                    <ChatBox chatHistory={[chat.content]} chatID={chat.id} />
                                </TabPanel>
                            ))}
                        </TabPanels>
                    </Tabs>
                </ Box>
            </ChakraProvider > : null


    );
}
