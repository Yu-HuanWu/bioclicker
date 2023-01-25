import './App.css';
import { AutoIncrement } from './gameplay/autoincrement.js'
import { OrganismList } from './gameplay/organisms.js'
import { Biomass } from './gameplay/biomass.js'

let organism = {
    id: 1,
    cps: 5,
    cost: 10,
    name: "Bacteria"
  }
function App() {
  return (
    <div className="App">
      <header className="App-header">
        BIO CLICKER
        <Biomass/>
        <AutoIncrement organism={organism}/>
        <OrganismList/>
      </header>
    </div>
  );
}

export default App;
