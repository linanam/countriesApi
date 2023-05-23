import styles from './search.module.scss';

export const Search = (props) => {
    const {loading, query, onSearch} = props;

    if (loading) return;
    return (
        <div className={styles.search}>
            <span className={`${styles.searchIcon} searchIcon`}></span>
            <input className={styles.input} value={query} onChange={onSearch} type="text" placeholder="Search for a country" />
        </div>
    )
}