import { createContext, useContext, useEffect, useState } from "react"; // React függvények importálása
import axios from "../MyAxios"; // Axios saját konfigurációjú példányának importálása

// 1. Kontextus létrehozása
const FileContext = createContext(); // Globális állapotot biztosító kontextus

// 2. Kontextus Provider komponens
export const FileProvider = ({ children }) => {
    // Állapot a képek listájának tárolásához
    const [kepekLista, setKepekLista] = useState([]);

    // Adatok lekérdezése az API-ból
    const getLista = async (vegpont, callBack) => {
        try {
            // Axios GET kérés a megadott végpontra
            const { data } = await axios.get(vegpont); 
            callBack(data); // Sikeres válasz esetén meghívja a callback-et az adatokkal
        } catch (error) {
            console.error("Hiba történt a lista lekérdezésekor:", error);
        }
    };

    // Adatok küldése az API-nak (fájl feltöltés vagy adatok mentése)
    const postAdat = async ({ ...adat }, vegpont) => {
        try {
            // Axios POST kérés a megadott végpontra
            const response = await axios.post(vegpont, adat, {
                headers: {
                    "Content-Type": "multipart/form-data", // Form-adatok fejléce
                },
            });
            console.log("Sikeres válasz:", response);
            setKepekLista(response.data); // Frissíti a képek listáját az új adatokkal
        } catch (error) {
            console.error("Hiba történt az adatküldés során:", error); // Hibakezelés
        }
    };

    // useEffect: A komponens betöltődésekor automatikusan lekérdezi a képek listáját
    useEffect(() => {
        getLista("/file-upload", setKepekLista); // "/file-upload" API végpontról adatok lekérése
    }, []); // Üres függőségi tömb -> csak egyszer fut le, a komponens betöltődésekor

    // Provider komponens visszatérése, ami a kontextus értékeket továbbítja
    return (
        <FileContext.Provider value={{ kepekLista, postAdat }}>
            {children} {/* A gyermek komponensek, amelyek hozzáférnek a kontextushoz */}
        </FileContext.Provider>
    );
};

// 3. Hook a kontextus könnyű használatához
export default function useFileContext() {
    return useContext(FileContext); // A kontextus használata egyéni hook segítségével
}
