
import { useEffect, useState } from "react";
import { getPokedexNumber, getFullPokedexNumber } from "../utils";
import  TypeCard  from "./TypeCard";

export default function PokeCard(props) {
    const { selectedPokemon } = props;
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const {name, height, abilities, stats, types, moves, sprites} = data || {};

    useEffect(() => {
        if (loading || !localStorage) { return }

        let cache = {}
        if (localStorage.getItem('pokedex')){
            cache = JSON.parse(localStorage.getItem('pokedex'))
        }

        if (selectedPokemon in cache){
            setData(cache[selectedPokemon])
            return
        }

        async function fetchPokemonData(){
            setLoading(true)
            try{
                const baseUrl = 'https://pokeapi.co/api/v2/';
                const sufix = `pokemon/${getPokedexNumber(selectedPokemon)}`;
                const finalUrl = baseUrl + sufix;
                const response = await fetch(finalUrl);
                const data = await response.json();
                setData(data);
                console.log(data)

                cache[selectedPokemon] = data
                localStorage.setItem('pokedex', JSON.stringify(cache))
            }catch (e){
                console.log(e)
            }
            finally{
                setLoading(false)
            }
        }
        fetchPokemonData( )

    }, [selectedPokemon]);

    if (loading || !data){
        return (
            <div className="poke-card">
                <h2>Loading...</h2>
            </div>
        )
    }

    return (
        <div className="poke-card">
            <div>
                <h4 className="numPoke"> {getFullPokedexNumber(selectedPokemon)}</h4>
                <h2 className="namePoke">{data.name}</h2>
            </div>
            <div>
                {types.map((typeObj, index) => {
                    return(
                        <TypeCard key={index} type={typeObj?.type?.name} />
                    )
                })}
            </div>
            <img src={sprites.front_default} alt={name} className="imgPoke"/>
        </div>
    )
}