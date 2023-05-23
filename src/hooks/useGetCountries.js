import {useEffect, useState} from "react";
import {settings} from "../settings/settings";

export const useGetCountries = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const url = `https://restcountries.com/v3.1/all?fields=${settings['countriesMainInfo'].join(',')},${settings['countriesLines'].join(',')}`;

    useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setLoading(false);
                setData(data);
                console.log(data);
            })
            .catch((error) => setError(error))
    }, [])

    return {data, loading, error};
}