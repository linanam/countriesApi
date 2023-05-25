import {useContext, useEffect, useState} from "react";
import {ThemeContext} from "../../context/ThemeContext";
import {CountriesContext} from "../../context/CountriesContext";
import styles from './home.module.scss';
import {Link} from "react-router-dom";
import {Search} from "../../components/Search/Search";
import {settings} from './../../settings/settings';
import Select from 'react-select';

export const Home = () => {
    const {theme} = useContext(ThemeContext);
    const {data, loading, error} = useContext(CountriesContext);
    const lineList = settings['countriesLines'];
    const [query, setQuery] = useState('');
    const [countries, setCountries] = useState([]);
    const [options, setOptions] = useState([]);
    const filterStyles = {
        option: (defaultStyles, state) => ({
            ...defaultStyles,
            color: state.isSelected ? "#fff" : "#000",
            backgroundColor: state.isSelected ? "#858585" : "#fff",
        }),
    };

    useEffect(() => {
        setCountries(data);
        if (data) {
            const regions = [...new Set(data.map((item) => item.region))];
            const filterOptions = regions.map((region) => {
                return {
                    'label': region,
                    'value': region.toLowerCase()
                }
            });
            setOptions(filterOptions);
        }
    }, [data]);

    function onSearch(e) {
        let currentQuery = e.target.value;
        setQuery(currentQuery);

        if (currentQuery.length > 0 && data.length) {
            const countries = [...data];
            currentQuery = currentQuery.toLowerCase();
            const filteredProducts = countries.filter((country) => country.name.common.toLowerCase().includes(currentQuery));
            setCountries(filteredProducts);
        } else if (currentQuery.length > 0) {
            setCountries([]);
        } else {
            setCountries(data);
        }
    }

    function onFilterChange(value) {
        const filteredCountries = data.filter((item) => {
            return item.region === value.label;
        });
        setCountries(filteredCountries);
    }

    if (error) return <div>Problem with API</div>
    return (
        <>
            {loading && <div className="loading">Loading...</div>}
            <div className={styles.panel}>
                <Search loading={loading} query={query} onSearch={onSearch} />
                {
                    (!loading && options.length > 0) && <Select
                        onChange={onFilterChange}
                        options={options}
                        styles={filterStyles}
                        placeholder="Filter by Region"
                        className="react-select-container"
                        classNamePrefix="react-select"
                    />
                }
            </div>
            <div className={styles.list}>
                {
                    (countries && countries.length > 0) && countries.map((item) => {
                        return (
                            <Link key={item.cca2} className={styles.item} to={item.cca2.toLowerCase()}>
                                {item.flags.svg && <img className={styles.flag} alt={item.name.common} src={item.flags.svg} />}
                                <h3>{item.name.common}</h3>
                                {
                                    lineList.map((line, i) => {
                                        return (
                                            <div key={i} className={`${styles.line} line`}>
                                                {item.hasOwnProperty(line) && <label>{line}:</label>}
                                                {item.hasOwnProperty(line) && item[line]}
                                            </div>
                                        )
                                    })
                                }
                            </Link>
                        )
                    })
                }
            </div>
        </>
    )
}