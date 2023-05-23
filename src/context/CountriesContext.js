import {createContext} from "react";
import {useGetCountries} from "../hooks/useGetCountries";

const CountriesContext = createContext();

function CountriesContextProvider(props) {
    const countriesData = useGetCountries();

    return (
        <CountriesContext.Provider value={countriesData}>
            {props.children}
        </CountriesContext.Provider>
    )
}

export {CountriesContext, CountriesContextProvider}