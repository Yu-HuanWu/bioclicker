import './App.css';
import { AutoIncrement } from './species/autoincrement.js'

let upgrade = {
    id: 1,
    cps: 5,
    cost: 10,
    name: "auto-clicker"
  }
function App() {
  return (
    <div className="App">
      <header className="App-header">
        BIO CLICKER
        <AutoIncrement upgrade={upgrade}/>
      </header>
    </div>
  );
}

export default App;
