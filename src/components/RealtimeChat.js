import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  push,
  onChildAdded,
  child,
  get,
} from "firebase/database";
import { useEffect, useRef, useState } from "react";
import styles from "./RealtimeChat.module.scss";

const env = process.env;

const firebaseConfig = {
  databaseURL: env.REACT_APP_FIREBASE_DB_URL,
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export const ChatInputField = () => {
  const [nameStat, setNameStat] = useState("");
  const [messageStat, setMessageStat] = useState("");
  const [receivedMessageList, setReceivedMessageList] = useState([]);
  const firebaseRefKeyRef = useRef(null);
  const receivedMessageListRef = useRef(null);
  receivedMessageListRef.current = receivedMessageList;

  const room = "chat_room";
  const handleSendButton = () => {
    const pushObj = push(ref(database, room), {
      name: nameStat,
      message: messageStat,
    });
    firebaseRefKeyRef.current = pushObj.key;
    setNameStat("");
    setMessageStat("");
  };
  const appendRecievedMessageList = (messageObj) => {
    setReceivedMessageList([...receivedMessageListRef.current, messageObj]);
  };
  const connectChatDb = () => {
    // 過去のメッセージ取得
    get(child(ref(database), `${room}`)).then((data) => {
      const v = data.val();
      const messageList = Object.keys(v).map((m) => v[m]);
      setReceivedMessageList(messageList);
    });

    // メッセージ送信時のリスナ登録
    onChildAdded(ref(database, room), (data) => {
      const v = data.val();
      const k = data.key;
      appendRecievedMessageList(v);
    });
  };

  useEffect(connectChatDb, []);
  return (
    <div className={`${styles["realtime-chat"]}`}>
      <div id="output" className={`${styles["realtime-chat--display"]}`}>
        {receivedMessageList.map((rm, idx) => {
          if (!rm) return;
          return (
            <div
              className={`${styles["realtime-chat--display__chat"]} output-chat`}
              key={idx}
            >
              <div
                className={`${styles["realtime-chat--display__chat__name"]} name`}
              >{`名前: ${rm.name}`}</div>
              <div
                className={`${styles["realtime-chat--display__chat__message"]} message`}
              >{`メッセージ: ${rm.message}`}</div>
            </div>
          );
        })}
      </div>
      <div className={`${styles["realtime-chat--form"]}`}>
        <div className={`${styles["realtime-chat--form__name"]}`}>
          <input
            type="text"
            id="name"
            value={nameStat}
            onChange={(e) => setNameStat(e.currentTarget.value)}
          />
        </div>
        <div className={`${styles["realtime-chat--form__message"]}`}>
          <textarea
            id="message"
            row="10"
            value={messageStat}
            onChange={(e) => setMessageStat(e.currentTarget.value)}
          ></textarea>
        </div>
        <div className={`${styles["realtime-chat--form__send-button"]}`}>
          <button id="send" onClick={handleSendButton}>
            send
          </button>
        </div>
      </div>
    </div>
  );
};

const RealtimeChat = () => {
  return <ChatInputField />;
};

export default RealtimeChat;
