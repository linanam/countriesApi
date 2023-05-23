import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

export const useGetCountry = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const path = useLocation().pathname.replace('/', '');
    const url = `https://restcountries.com/v3.1/alpha/${path}`;

    useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setLoading(false);
                setData(data);
                console.log(data);
            })
            .catch((error) => setError(error))
    }, [path])

    return {data, loading, error};
}