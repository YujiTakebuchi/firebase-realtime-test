import { useState } from "react";
import RealtimeChat from "./RealtimeChat";
import styles from "./Demo.module.scss";
import RealtimeEventProgress from "./RealtimeEventProgress";
import RealtimeStamp from "./RealtimeStamp";

const DemoSwtich = ({ onClick }) => {
  return (
    <div className={styles["ds"]}>
      <button onClick={() => onClick(<RealtimeEventProgress />)}>
        イベント進行demo
      </button>
      <button onClick={() => onClick(<RealtimeStamp />)}>スタンプdemo</button>
      {/* <button onClick={() => onClick(<RealtimeChat />)}>チャットdemo</button> */}
    </div>
  );
};

const Demo = () => {
  const [demo, setDemo] = useState(<RealtimeEventProgress />);
  return (
    <div className={styles["demo"]}>
      <div className={styles["demo-switch"]}>
        <DemoSwtich onClick={setDemo} />
      </div>
      <div className={styles["demo-content"]}>{demo}</div>
    </div>
  );
};

export default Demo;
