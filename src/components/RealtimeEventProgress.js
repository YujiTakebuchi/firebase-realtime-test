import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";
import styles from "./RealtimeEventProgress.module.scss";

const env = process.env;

const firebaseConfig = {
  databaseURL: env.REACT_APP_FIREBASE_DB_URL,
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export const LiveFlowText = () => {
  const [flowState, setFlowState] = useState("");

  const dbKey = "live_flow";
  const connectChatDb = () => {
    // メッセージ送信時のリスナ登録
    onValue(ref(database, dbKey), (data) => {
      const v = data.val();
      const k = data.key;
      setFlowState(v);
    });
  };

  useEffect(connectChatDb, []);
  return (
    <div className={`${styles["live-flow-progress-bord"]}`}>
      <p>{flowState}</p>
    </div>
  );
};

const RealtimeEventProgress = () => {
  return <LiveFlowText />;
};

export default RealtimeEventProgress;
