import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  push,
  onChildAdded,
  child,
  get,
} from "firebase/database";
import { useEffect, useReducer, useRef, useState } from "react";

const env = process.env;

const firebaseConfig = {
  databaseURL: env.REACT_APP_FIREBASE_DB_URL,
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const reducerFunc = (msgList, action) => {
  switch (action.type) {
    case "push":
      return [...msgList].concat(action.messageList);
  }
};

export const ChatInputField = () => {
  const [nameStat, setNameStat] = useState("");
  const [messageStat, setMessageStat] = useState("");
  const [receivedMessageList, setReceivedMessageList] = useReducer(
    reducerFunc,
    []
  );
  const refKeyRef = useRef(null);

  const room = "chat_room";
  const handleSendButton = () => {
    const pushObj = push(ref(database, room), {
      name: nameStat,
      message: messageStat,
    });
    refKeyRef.current = pushObj.key;
    setNameStat("");
    setMessageStat("");
  };
  const connectChatDb = () => {
    // 過去のメッセージ取得
    get(child(ref(database), `${room}`)).then((data) => {
      const v = data.val();
      const messageList = Object.keys(v).map((m) => v[m]);
      setReceivedMessageList({ type: "push", messageList: messageList });
    });

    // メッセージ送信時のリスナ登録
    onChildAdded(ref(database, room), (data) => {
      const v = data.val();
      const k = data.key;
      setReceivedMessageList({ type: "push", messageList: [v] });
    });
  };

  useEffect(connectChatDb, []);
  return (
    <div>
      <div>
        <input
          type="text"
          id="name"
          value={nameStat}
          onChange={(e) => setNameStat(e.currentTarget.value)}
        />
      </div>
      <div>
        <textarea
          id="message"
          row="10"
          value={messageStat}
          onChange={(e) => setMessageStat(e.currentTarget.value)}
        ></textarea>
        <button id="send" onClick={handleSendButton}>
          send
        </button>
      </div>
      <div id="output">
        {receivedMessageList.map((rm, idx) => {
          if (!rm) return;
          return (
            <div className={"output-chat"} key={idx}>
              <div className="name">{`名前: ${rm.name}`}</div>
              <div className="message">{`メッセージ: ${rm.message}`}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const RealtimeChat = () => {
  return <ChatInputField />;
};

export default RealtimeChat;
