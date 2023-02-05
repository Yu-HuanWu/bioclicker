import './App.css';
import { useBioStore } from "./store.js"
import { AutoIncrementByOrganisms } from './gameplay/autoincrement.js'
import { OrganismList } from './gameplay/organisms.js'
import { TraitList } from './gameplay/traits.js'
import { Biomass, Polymerization, Energy } from './gameplay/biomass.js'

function App() {
  const evolvedTraits = useBioStore(s => s.evolvedTraits)
  const carbohydrateEvolved = evolvedTraits.filter(trait=> {
    return trait.id === 1;
  }).length > 0;
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
          {carbohydrateEvolved &&
            <Energy/>
          }
        </div>
        <div className="Right">
          <TraitList/>
        </div>
        <AutoIncrementByOrganisms/>
      </div>
    </div>
  );
}

export default App;
