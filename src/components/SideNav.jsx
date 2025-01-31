
import { first151Pokemon, getFullPokedexNumber } from '../utils/index.js';

export default function SideNav (){
    return (
      <nav className="sidenav">
        <div className="nav-header">
          <h1>Pokedex</h1>
          <input type="text" placeholder="Search Pokemon" />
        </div>
          {first151Pokemon.map((pokemon, pokemonIndex) => {
            return(
              <button key={pokemonIndex} className={'nav-card'}>
                <p>{getFullPokedexNumber(pokemonIndex)}</p>
                <p>{pokemon}</p>
              </button>
            )
})}
      </nav>
    );
}