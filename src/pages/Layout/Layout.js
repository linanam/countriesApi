import {Outlet} from "react-router-dom";
import {Header} from "../../components/Header/Header";
import {useContext} from "react";
import {ThemeContext} from "../../context/ThemeContext";

export const Layout = () => {
    const {theme} = useContext(ThemeContext);

    return (
        <main className={`${theme} main`}>
            <Header />
            <Outlet />
        </main>
    )
}