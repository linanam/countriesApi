import {useContext} from "react";
import {ThemeContext} from "../../context/ThemeContext";
import styles from './header.module.scss';

export const Header = () => {
    const {theme, themesSwitcher, switchTheme} = useContext(ThemeContext);

    return (
        <header>
            <h2><a href="/">Where in the world?</a></h2>
            <div className={`${styles.button} themeButton`}>
                <span className={`${styles.icon} icon`}></span>
                <button onClick={switchTheme}>{themesSwitcher[theme]} mode</button>
            </div>
        </header>
    )
}