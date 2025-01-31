
export default function Header(props) {
    const { hanldeToogleMenu }= props
    return (
        <header className="menu">
            <button className="open-search" onClick={()=>{hanldeToogleMenu()}}><i className="fa-solid fa-bars"></i></button>
            <h1>Pokedex</h1>
        </header>
    )
}