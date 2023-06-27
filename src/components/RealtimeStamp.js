import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import styles from "./RealtimeStamp.module.scss";

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
  return (
    <div className={`${styles["stamp-button"]}`}>
      <button id="stamp-button">🚀</button>
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
