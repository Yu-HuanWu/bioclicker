import './App.css';
import { AutoIncrementByOrganisms } from './gameplay/autoincrement.js'
import { OrganismList } from './gameplay/organisms.js'
import { Biomass, Polymerization } from './gameplay/biomass.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        BIO CLICKER
      </header>
      <div className="Game">
        <div className="Left">
          <OrganismList/>
        </div>
        <div className="Center">
          <Biomass/>
          <Polymerization/>
        </div>
        <AutoIncrementByOrganisms/>
      </div>
    </div>
  );
}

export default App;
