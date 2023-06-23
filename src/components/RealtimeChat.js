import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

export const ChatInputField = () => {
  return (
    <div>
      <div>
        <input type="text" id="name" />
      </div>
      <div>
        <textarea id="message" row="10"></textarea>
        <button id="send">send</button>
      </div>
      <div id="output"></div>
    </div>
  );
};

const RealtimeChat = () => {
  const env = process.env;

  const connectRealtimeDatabase = () => {
    console.log(process.env.REACT_APP_FIREBASE_DB_URL);
    const firebaseConfig = {
      databaseURL: env.REACT_APP_FIREBASE_DB_URL,
    };

    const app = initializeApp(firebaseConfig);

    const database = getDatabase(app);
    console.log(database);
  };

  connectRealtimeDatabase();
  return <ChatInputField />;
};

export default RealtimeChat;
