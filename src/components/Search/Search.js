import styles from './search.module.scss';

export const Search = (props) => {
    const {loading, query, onSearch} = props;

    if (loading) return;
    return (
        <div className={styles.search}>
            <label htmlFor="search"><span className={`${styles.searchIcon} searchIcon`}></span></label>
            <input className={styles.input} name="search" id="search" value={query} onChange={onSearch} type="text" placeholder="Search for a country" />
        </div>
    )
}