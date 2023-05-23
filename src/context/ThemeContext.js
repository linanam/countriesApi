import {createContext, useState} from "react";

const ThemeContext = createContext();


function ThemeContextProvider(props) {
    const defaultTheme = 'light';
    const themesSwitcher = {
        'light': 'dark',
        'dark': 'light'
    };
    const themeState = getThemeState();
    const [theme, setTheme] = useState(themeState);

    function getThemeState() {
        const themeState = localStorage.getItem('themeState');
        return (themeState) ? themeState : defaultTheme;
    }

    function switchTheme(e) {
        e.preventDefault();
        const newTheme = themesSwitcher[theme];
        localStorage.setItem('themeState', newTheme);
        setTheme(newTheme);
    }

    return (
        <ThemeContext.Provider value={{theme, themesSwitcher, switchTheme}}>
            {props.children}
        </ThemeContext.Provider>
    )
}

export {ThemeContext, ThemeContextProvider}