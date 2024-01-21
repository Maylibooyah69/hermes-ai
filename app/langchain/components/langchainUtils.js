import { BufferMemory } from "langchain/memory";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import { ChatMessageHistory } from "langchain/stores/message/in_memory";


import axios from "axios";


const memory = new BufferMemory({
    returnMessages: true,
    inputKey: "input",
    outputKey: "output",
    memoryKey: "chat_history",
});

function load_memory_from_json(json_content) {
    ChatMessageHistory
}

function parse_content(content) {
    if (!content || !content[0]['messages']) {
        return [];
    }
    let messages = content.flatMap(chat =>
        Array.isArray(chat['messages']) ? chat['messages'].map(message => [message.data.content, message.data.type]) : []
    );
    return messages
}

function issue_localLLM_post(chatID, token, content, setContent,setParsed ,setSending){
    axios.patch(`http://localhost:8000/api/chat/chats/${chatID}/`, {
        content: content[0],
    }, {
        headers: {
            Authorization: `Token ${token}`,
        },
    })
        .then((response) => {
            console.log('setting content after api', response.data.content)
            setContent(response.data.content)
            setParsed(parse_content([response.data.content]))
            setSending(false)
        })
        .catch((error) => {
            console.log(error);
        });

}

function create_localLLM_chat(token, title) {
    axios.post('http://localhost:8000/api/chat/chats/', {
        title: title,
        content: {
            "messages": []
        }
    }, {
        headers: {
            Authorization: `Token ${token}`,
        },
    })
        .then((response) => {
            console.log(response.data);

        })
        .catch((error) => {
            console.log(error);
        });
}

function delete_localLLM_chat(token, chatID) {
    axios.delete(`http://localhost:8000/api/chat/chats/${chatID}/`, {
        headers: {
            Authorization: `Token ${token}`,
        },
    })
        .then((response) => {
            console.log(response.data);

        })
        .catch((error) => {
            console.log(error);
        });
}




export { issue_localLLM_post, parse_content, create_localLLM_chat,delete_localLLM_chat}