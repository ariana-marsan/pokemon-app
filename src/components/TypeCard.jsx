import { pokemonTypeColors } from '../utils/index.js';

export default function TypeCard(props){
    const { type } = props;
    return (
        <div className="typeCard" style={{color: pokemonTypeColors?.[type]?.color, background: pokemonTypeColors?.[type]?.background}}>
            <p className='types'>{type}</p>
        </div>
    )
}