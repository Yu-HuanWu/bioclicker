import './App.css';
import { AutoIncrementByOrganisms } from './gameplay/autoincrement.js'
import { OrganismList } from './gameplay/organisms.js'
import { Biomass, Polymerization } from './gameplay/biomass.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        BIO CLICKER
        <Polymerization/>
        <Biomass/>
        <AutoIncrementByOrganisms/>
        <OrganismList/>
      </header>
    </div>
  );
}

export default App;
