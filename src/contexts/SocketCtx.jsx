import React, { createContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNotification } from "store/notification";

export const SocketCtx = createContext();

export default function Socket({ children }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { notifications } = useSelector((state) => state.notification);

  useEffect(() => {
    let websocket = null;
    if (user) {
      // websocket = new WebSocket(
      //   "ws://odoo-api.artelelectronics.com/ws/notification/", null, {
      //     headers: {
      //       "Authorization": `Token ${user.token}`
      //     }
      //   }
      // );

      websocket = new WebSocket(
        `ws://odoo-api.artelelectronics.com/ws/notification/?token=${user.token}`
      );

      websocket.onopen = function () {
        console.log("[open] Connection established");
      };

      websocket.onmessage = function (event) {
        const message = JSON.parse(event.data);
        dispatch(addNotification(message.data));
      };
      websocket.onerror = function (error) {
        console.log(`[error] ${error.message}`);
      };
    }
    return () => {
      websocket = null;
    };
  }, [dispatch, user]);

  return (
    <SocketCtx.Provider value={notifications}>{children}</SocketCtx.Provider>
  );
}
