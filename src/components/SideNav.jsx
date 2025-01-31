
import { first151Pokemon, getFullPokedexNumber } from '../utils/index.js';
import { useState } from 'react';

export default function SideNav (props){
  const { selectedPokemon, setSelectedPokemon, hanldeToogleMenu, showSideMenu } = props;

  const [search, setSearch] = useState('');

  const filteredPokemon = first151Pokemon.filter((el, elIndex) => {
    if (getFullPokedexNumber(elIndex).includes(search)) {
      return true;
    }
    if (el.toLowerCase().includes(search.toLowerCase())) {
      return true;
    }
    return false;
    })

    return (
      <nav className={"sidenav" + (showSideMenu ? " " : ' open')}>
        <div className="nav-header">
          <h1>Pokedex</h1>
          <input type="text" placeholder="Search Pokemon" value={search} onChange={(e)=>{
            setSearch(e.target.value);
          }}/>
        </div>
          {filteredPokemon.map((pokemon, pokemonIndex) => {
            return(
              <button key={pokemonIndex} className={'nav-card' + (pokemonIndex === selectedPokemon ? ' selectedCard' : '')} onClick={()=>{
                setSelectedPokemon(first151Pokemon.indexOf(pokemon));
              }}>
                <p>{getFullPokedexNumber(first151Pokemon.indexOf(pokemon))}</p>
                <p>{pokemon}</p>
              </button>
            )
})}
      </nav>
    );
}