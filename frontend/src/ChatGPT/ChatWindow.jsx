import React, { useEffect, useState } from 'react';
import Message from './MessageItem';
// import axios from 'axios';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { API, Auth } from 'aws-amplify';


const ChatWindow = ({chat}) => {
  // Replace the array with actual message data
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const { user } = useAuthenticator((context) => [context.user]);

  useEffect(() => {
    async () => {
        // fetch the messages for each chat if authorized using API.get
        const result = await API.get("api", `/chats/${chat.id}/messages`, {
          headers: {
            Authorization: `Bearer ${(await Auth.currentSession())
              .getAccessToken()
              .getJwtToken()}`,
          },
        });
        setMessages(result.messages);
    }
  }, [chat]);



  const handleSend = async () => {
    const result = await API.post("api", `/chats/${chat.id}/messages`, {
      body: { content: input },
      headers: {
        Authorization: `Bearer ${(await Auth.currentSession())
          .getAccessToken()
          .getJwtToken()}`,
      },
    });

    const newMessage = result.message;
    setMessages([...messages, newMessage]);
    console.log(result)
    setInput('');
  };

  const handleMessageUpdate = async (id, content) => {
    const result = await API.put("api", `/chats/${chat.id}/messages/${id}`, {
      body: { content },
      headers: {
        Authorization: `Bearer ${(await Auth.currentSession())
          .getAccessToken()
          .getJwtToken()}`,
      },
    });

    const updatedMessages = messages.map((message) =>
      message.id === id ? { ...message, content } : message
    );
    console.log(id, content)
  }

  const handleMessageDelete = async (id) => {
    await API.del("api", `/chats/${chat.id}/messages/${id}`, {
      headers: {
        Authorization: `Bearer ${(await Auth.currentSession())
          .getAccessToken()
          .getJwtToken()}`,
      },
    });


    const updatedMessages = messages.filter((message) => message.id !== id);
    setMessages(updatedMessages);

    console.log(id)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-y-auto">
        {messages.map((message) => (
          <Message key={message.id} message={message} onUpdate={handleMessageUpdate} onDelete={handleMessageDelete} />
        ))}
      </div>
      <div className="flex mt-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow p-2 border rounded"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSend}
          className="ml-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
