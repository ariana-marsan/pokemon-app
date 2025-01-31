
import { useEffect, useState } from "react";
import { getPokedexNumber, getFullPokedexNumber } from "../utils";
import  TypeCard  from "./TypeCard";
import Modal from './Modal';

export default function PokeCard(props) {
    const { selectedPokemon } = props;
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [skill, setSkill] = useState(null);
    const [loadingSkill, setLoadingSkill] = useState(false);

    const {name, height, abilities, stats, types, moves, sprites} = data || {};

    const imgList = Object.keys(sprites || {}).filter(val => {
        if (!sprites[val]) { return false };
        if (['versions', 'other'].includes(val)) { return false };
        return true;
    });

    async function fetchMoveData(move, moveUrl){
        if (loadingSkill || !localStorage || !moveUrl) { return }

        let cache = {}
        if (localStorage.getItem('pokemon-moves')){
            cache = JSON.parse(localStorage.getItem('pokemon-moves'))
        }
        if (move in cache){
            setSkill(cache[move])
            return
        }

        try{
            setLoadingSkill(true)
            const response = await fetch(moveUrl);
            const moveData = await response.json();
            const description = moveData?.flavor_text_entries.filter(val=>{
                return val.version_group.name = 'firered-leafgreen'
            })[0]?.flavor_text

            const skill = {
                name: move,
                description
            }
            setSkill(skill)
            cache[move] = skill
            localStorage.setItem('pokemon-moves', JSON.stringify(cache))
        } catch (e){
            console.log(e)
        } finally{
            setLoadingSkill(false)
        }
    }

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
            {skill && 
            (<Modal handleCloseModal={()=>{ setSkill(null)}}>
                <section  className="modal-modal">
                <div>
                    <h6>Name:</h6>
                    <p>{skill.name.replaceAll('-', ' ')}</p>
                </div>
                <div>
                    <h6>Descripction:</h6>
                    <p>{skill.description}</p>
                </div>
                </section>
            </Modal>)}
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
            <div className="imgsContainer">
                {imgList.map((img, index) => {
                    const url = sprites[img]
                    return(
                        <img key={index} src={url} alt={name} className="subImgsPoke"/>
                    )
                }
                )}
            </div>
            <div className="stats-container">
            <h3>Stats</h3>
            <div className="stats">
                {stats.map((statObj, index) => {
                    const {base_stat, stat} = statObj;
                    return (
                        <div key={index} className="stats-info">
                            <p>{stat?.name.replaceAll('-', '')}</p>
                            <h4> {base_stat}</h4>
                        </div>
                    )
                }
            )}
            </div>
            </div>
            <div className="moves-container">
            <h3>Moves</h3>
            <div className="moves">
                {moves.map((movesObj, index) => {
                    return (
                        <button key={index} onClick={()=>{
                            fetchMoveData(movesObj?.move?.name, movesObj?.move?.url)
                        }}>
                            <p>{movesObj?.move?.name.replaceAll('-', ' ')}</p>
                        </button>
                    )
                }
            )}
            </div>
            </div>
        </div>
    )
}