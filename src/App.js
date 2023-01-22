import './App.css';
import {Species} from './species/species.js'
let upgrade = {
  1: {
    id: 1,
    cps: 1,
    cost: 10,
    name: "auto-clicker"
  },
}
function App() {
  return (
    <div className="App">
      <header className="App-header">
        BIO CLICKER
        <Species upgrade={upgrade}/>
      </header>
    </div>
  );
}

export default App;
