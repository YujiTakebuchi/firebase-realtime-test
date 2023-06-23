import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import { useState } from "react";

const env = process.env;

const firebaseConfig = {
  databaseURL: env.REACT_APP_FIREBASE_DB_URL,
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export const ChatInputField = () => {
  const [nameStat, setNameStat] = useState("");
  const [messageStat, setMessageStat] = useState("");

  const room = "chat_room";
  const handleSendButton = () => {
    set(ref(database, room), {
      name: nameStat,
      message: messageStat,
    });
    setNameStat("");
    setMessageStat("");
  };
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
      <div id="output"></div>
    </div>
  );
};

const RealtimeChat = () => {
  return <ChatInputField />;
};

export default RealtimeChat;
