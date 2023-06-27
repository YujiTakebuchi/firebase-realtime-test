import { initializeApp } from "firebase/app";
import { getDatabase, push, ref } from "firebase/database";
import styles from "./RealtimeStamp.module.scss";
import { useRef } from "react";

const env = process.env;

const firebaseConfig = {
  databaseURL: env.REACT_APP_FIREBASE_DB_URL,
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export const StampScreen = () => {
  return <div className={`${styles["stamp-screen"]}`}></div>;
};

export const StampButton = () => {
  const firebaseRefKeyRef = useRef(null);
  const dbKey = "simple-stamp";
  const handleSendButton = () => {
    const pushObj = push(ref(database, dbKey), {
      stamp_id: "1",
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
