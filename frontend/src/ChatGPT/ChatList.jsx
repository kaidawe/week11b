import React, { useState, useEffect } from 'react';
import ChatItem from './ChatItem';
import NewChatButton from './NewChatButton';
import axios from 'axios';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { API, Auth } from 'aws-amplify';

const ChatList = ({ onSelect, selectedChat }) => {
  const [chats, setChats] = useState([]);

  const { user } = useAuthenticator((context) => [context.user]);

  useEffect(() => {

    API.get("api", "/chats").then((res) => {
      setChats(res.chats);
    })
    .catch (err => {
      console.log("error", err);
    });
  }, []);


  const updateChat = async (id, newName) => {

    const result = await API.put("api", `/chats/${id}`, {
      body: { name: newName },
      headers: {
        Authorization: `Bearer ${(await Auth.currentSession())
          .getAccessToken()
          .getJwtToken()}`,
      },
    });

    const updatedChats = chats.map((chat) =>
      chat.id === id ? { ...chat, name: newName } : chat
    );
    setChats(updatedChats);
  };

  const deleteChat = async (id) => {
    // const apiURL = import.meta.env.VITE_API_URL;
    // const result = await axios.delete(`${apiURL}/chats/${id}`)

    await API.del("api", `/chats/${id}`, {
      headers: {
        Authorization: `Bearer ${(await Auth.currentSession())
          .getAccessToken()
          .getJwtToken()}`,
      },
    });

    const updatedChats = chats.filter((chat) => chat.id !== id);
    setChats(updatedChats);
  };

  const createChat = async (name) => {
    try {
      const result = await API.post(
        "api",
        "/chats",
        {
          body: { name } ,
          headers: {
            Authorization: `Bearer ${(await Auth.currentSession())
              .getAccessToken()
              .getJwtToken()}`,
          },
        }
      );
      const newChat = result.chat;
      setChats([...chats, newChat]);
    } catch (error) {
      alert("Error")
      console.log(error);
    } 
  };

  return (
    <div className="overflow-y-auto">
      {chats.map((chat) => (
        <ChatItem selected={chat.id == selectedChat?.id} key={chat.id} chat={chat} onSelect={onSelect} onUpdate={updateChat} onDelete={deleteChat} />
      ))}
      <NewChatButton onCreate={createChat} />
    </div>
  );
};

export default ChatList;
