import axios from "../MyAxios";
import { createContext, useContext, useEffect, useState } from "react";

const FileContext = createContext(); // context létrehozása
export const FileProvider = ({ children }) => { //Provider

const [kepekLista, setKepekLista] = useState([]);// a state változók elkészítése

//Az adatok lekérdezése a végpontról
const getLista = async (vegpont, callBack) => {
    const { data } = await axios.get(vegpont);
    callBack(data);
};

// adatok küldése 

const postAdat = async ({ ...adat }, vegpont) => {   
    try {
    await axios
        .post(vegpont, adat, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        })
        .then((resp) => {
        console.log(resp);
        setKepekLista(resp.data);
        });
    } catch (error) {
    console.log(error);
    }
};

useEffect(() => {
    getLista("/file-upload", setKepekLista);
}, []);

return (
    <FileContext.Provider value={{ kepekLista, postAdat }}>
    {children}
    </FileContext.Provider>
);
};

export default function useFileContext() {
return useContext(FileContext);
}