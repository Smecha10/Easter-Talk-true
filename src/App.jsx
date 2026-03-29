import Timer from './components/Timer';
import TalkContent from './components/TalkContent';
import './index.css';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Easter Sunday Presentation</h1>
        <p className="subtitle">The Greatest Easter Story Ever Told</p>
      </header>
      
      <main className="app-main">
        <TalkContent />
      </main>

      {/* Floating Timer */}
      <div className="timer-wrapper">
        <Timer />
      </div>
    </div>
  );
}

export default App;
