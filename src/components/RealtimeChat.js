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
  return <ChatInputField />;
};

export default RealtimeChat;
