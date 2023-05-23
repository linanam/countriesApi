import styles from "./country.module.scss";
import {settings} from "../../settings/settings";
import {Link} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {CountriesContext} from "../../context/CountriesContext";

export const Country = (props) => {
    const {countryData} = props;
    const {data} = useContext(CountriesContext);
    const lineList = settings['countryLines'];
    const [borderCountries, setBorderCountries] = useState([]);

    let item,
        nativeName,
        currencyNames,
        languages;

    if (countryData && countryData.length > 0) {
        item = countryData[0];
        nativeName = [...new Set(Object.values(item.name.nativeName).map((name) => name['official']))];
        currencyNames = Object.values(item.currencies).map((currency) => currency['name']);
        languages = Object.values(item.languages).join(', ');
    }

    useEffect(() => {
        if (data && data.length) {
            const borders = item.borders?.map((countryCca) => {
                return data.find(element => element.cca3 === countryCca);
           });
            setBorderCountries(borders);
        }
    }, [data]);

    if(!item) return;
    return (
        <div className={styles.details}>
            <div className={styles.backWrap}>
                <Link to="/" className={`${styles.button} ${styles.backButton} button`}>Back</Link>
            </div>
            <div className={styles.countryInfoWrap}>
                {item.flags.svg && <img className={styles.flag} src={item.flags.svg} />}
                <div className={styles.countryInfo}>
                    <h3>{item.name.common}</h3>
                    <div className={styles.lineList}>
                        <div>
                            {nativeName && (
                                <div className={`${styles.line} line`}>
                                    <label>native name:</label>
                                    {nativeName.join(', ')}
                                </div>
                            )}
                            {
                                Object.keys(lineList).map((key, i) => {
                                    return (
                                        <div key={i} className={`${styles.line} line`}>
                                            {item.hasOwnProperty(key) && (
                                                <div className={key}>
                                                    <label>{lineList[key]}:</label>
                                                    {(Array.isArray(item[key])) ? item[key].join() : item[key]}
                                                </div>
                                            )}
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div>
                            {item.tld && (
                                <div className={`${styles.line} ${styles.tld} tld`}>
                                    <label>Top level domain:</label>
                                    {item.tld}
                                </div>
                            )}
                            {currencyNames && (
                                <div className={`${styles.line} ${styles.currencies} line`}>
                                    <label>Currencies:</label>
                                    {currencyNames.join(', ')}
                                </div>
                            )}
                            {languages && (
                                <div className={`${styles.line} line`}>
                                    <label>Languages:</label>
                                    {languages}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={`${styles.line} ${styles.borders} line borders`}>
                        {borderCountries && (
                            <>
                                <label>Border countries:</label>
                                <div className={styles.borderList}>
                                    {
                                        borderCountries.map((country, i) => {
                                            return (
                                                <Link key={i} className={`${styles.button} button`} to={`/${country.cca2.toLowerCase()}`}>
                                                    {country.name.common}
                                                </Link>
                                            )
                                        })
                                    }
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}