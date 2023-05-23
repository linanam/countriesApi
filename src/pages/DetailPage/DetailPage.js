import {useContext} from "react";
import {ThemeContext} from "../../context/ThemeContext";
import styles from './detailPage.module.scss';
import {useLocation} from "react-router-dom";
import {useGetCountry} from "../../hooks/useGetCountry";
import {Country} from "../../components/Country/Country";

export const DetailPage = () => {
    const {theme} = useContext(ThemeContext);
    const {data, loading, error} = useGetCountry();

    if (error) return <div>{error}</div>
    return (
        <div className={styles.detailsContent}>
            {loading && <div className="loading">Loading...</div>}
            {!loading && <Country countryData={data} />}
        </div>
    )
}