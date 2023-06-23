import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { useEffect, useState } from "react";

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

  const room = "chat_room";
  const handleSendButton = () => {
    set(ref(database, room), {
      name: nameStat,
      message: messageStat,
    });
    setNameStat("");
    setMessageStat("");
  };
  const connectChatDb = () => {
    onValue(ref(database, room), (data) => {
      const v = data.val();
      const k = data.key;
      setReceivedMessageList([...receivedMessageList, v]);
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
        {receivedMessageList.map((rm) => {
          return (
            <>
              <div className="name">{`名前: ${rm.name}`}</div>
              <div className="message">{`メッセージ: ${rm.message}`}</div>
            </>
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
