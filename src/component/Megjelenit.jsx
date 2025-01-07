import useFileContext from "../context/FileContext";
import Card from "./Card";

export default function Megjelenit() {
const { kepekLista } = useFileContext(); // itt tesszük elérhetővé  a context-ben megadott változót. 
//console.log(kepekLista);
return (
    <div className="container mt-3">
    <div className="row d-flex justify-content-around g-4">
        {kepekLista.map((kep, index) => {
        return <Card kep={kep} key={index} />;
        })}
    </div>
    </div>
);
}