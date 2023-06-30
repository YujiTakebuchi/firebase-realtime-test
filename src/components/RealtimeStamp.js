import { createRoot } from "react-dom/client";
import { initializeApp } from "firebase/app";
import { getDatabase, onChildAdded, push, ref } from "firebase/database";
import styles from "./RealtimeStamp.module.scss";
import { useEffect, useRef } from "react";

const env = process.env;

const firebaseConfig = {
  databaseURL: env.REACT_APP_FIREBASE_DB_URL,
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const stampMap = {
  stamp_01: "🚀",
  stamp_02: "☄️",
};

export const StampScreen = () => {
  const isFirstLoad = useRef(true);
  const stampScreenRef = useRef(null);

  const dbKey = "simple-stamp";
  const connectChatDb = () => {
    const appendStampEle = (stamp) => {
      const stampId = stamp["stamp_id"];
      const stampEmoji = stampMap[stampId];
      const stampEle = document.createElement("span");
      stampEle.textContent = stampEmoji;
      stampEle.className = stampId;
      stampScreenRef.current.appendChild(stampEle);
    };

    // スタンプ送信時のリスナ登録
    onChildAdded(ref(database, dbKey), (data) => {
      const v = data.val();
      const k = data.key;
      if (!isFirstLoad.current) {
        appendStampEle(v);
      }
    });

    return () => {
      isFirstLoad.current = false;
    };
  };

  useEffect(connectChatDb, []);
  return (
    <div className={`${styles["stamp-screen"]}`} ref={stampScreenRef}></div>
  );
};

export const StampButton = () => {
  const firebaseRefKeyRef = useRef(null);
  const dbKey = "simple-stamp";
  const handleSendButton = () => {
    const pushObj = push(ref(database, dbKey), {
      stamp_id: "stamp_01",
    });
    firebaseRefKeyRef.current = pushObj.key;
  };

  return (
    <div className={`${styles["stamp-button"]}`}>
      <button id="stamp-button" onClick={handleSendButton}>
        🚀
      </button>
    </div>
  );
};

const RealtimeStamp = () => {
  return (
    <div className="">
      <StampScreen />
      <StampButton />
    </div>
  );
};

export default RealtimeStamp;
