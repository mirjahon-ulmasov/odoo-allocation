import React, { createContext, useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const SocketCtx = createContext();

export default function Socket({ children }) {
  const { user } = useSelector((state) => state.auth);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    let websocket = null;
    if (user) {
      websocket = new WebSocket(`ws://odoo-api.artelelectronics.com/ws/notification/${user.id}/`);

      websocket.onopen = function () {
        console.log("[open] Connection established");
      };

      websocket.onmessage = function (event) {
        const message = JSON.parse(event);
        setMessages((prev) => [message, ...prev]);
      };
      websocket.onerror = function (error) {
        console.log(`[error] ${error.message}`);
      };
    }
    return () => {
      websocket = null;
    };
  }, [user]);

  return <SocketCtx.Provider value={messages}>{children}</SocketCtx.Provider>;
}
