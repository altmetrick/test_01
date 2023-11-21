import './App.css';
import { Calendar } from './components/Calendar/Calendar';

function App() {
  return (
    <div className="App">
      <header>
        <h2>Calendar</h2>
      </header>
      <main>
        <Calendar />
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
