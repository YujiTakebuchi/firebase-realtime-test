import "./App.scss";
import RealtimeChat from "./components/RealtimeChat";
import RealtimeEventProgress from "./components/RealtimeEventProgress";

function App() {
  return (
    <div className="App">
      <main>
        {/* <RealtimeChat /> */}
        <RealtimeEventProgress />
      </main>
    </div>
  );
}

export default App;
