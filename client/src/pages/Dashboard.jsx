import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ChatWindow from "../components/ChatWindow";
import ChatInput from "../components/ChatInput";
import api from "../services/api";

import "./dashboard.css";
import "../components/chat.css";

const Dashboard = () => {
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    loadChats();
  }, []);

  const loadChats = async () => {
    try {
      const res = await api.get("/chat/history");
      setChats(res.data);

      if (res.data.length) {
        setCurrentChat(res.data[0]);
        setMessages(res.data[0].messages || []);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const createNewChat = async () => {
    try {
      const res = await api.post("/chat/new");

      setChats([res.data, ...chats]);
      setCurrentChat(res.data);
      setMessages([]);
    } catch (err) {
      console.log(err);
    }
  };

  const sendMessage = async (text) => {
    if (!currentChat || !text.trim()) return;

    const optimistic = [...messages, { role: "user", content: text }];
    setMessages(optimistic);

    setLoading(true);

    try {
      const res = await api.post("/chat/message", {
        chatId: currentChat._id,
        message: text,
      });

      setMessages(res.data.messages);

      // Refresh sidebar so auto-generated title appears
      await loadChats();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // Delete Chat
  const deleteChat = async (id) => {
    try {
      await api.delete(`/chat/${id}`);

      const updated = chats.filter((chat) => chat._id !== id);

      setChats(updated);

      if (currentChat?._id === id) {
        if (updated.length) {
          setCurrentChat(updated[0]);
          setMessages(updated[0].messages || []);
        } else {
          setCurrentChat(null);
          setMessages([]);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="ph-app">
   <Sidebar
  chats={chats}
  open={sidebarOpen}
  onClose={() => setSidebarOpen(false)}
  onNewChat={createNewChat}
  onDelete={deleteChat}
  onSelect={(chat) => {
    setCurrentChat(chat);
    setMessages(chat.messages || []);
    setSidebarOpen(false);
  }}
/>

      <div className="ph-main">
        <button
          className="ph-menu"
          onClick={() => setSidebarOpen(true)}
        >
          <FaBars />
        </button>

        <Navbar />

        <ChatWindow
          messages={messages}
          loading={loading}
        />

        <ChatInput
          onSend={sendMessage}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default Dashboard;