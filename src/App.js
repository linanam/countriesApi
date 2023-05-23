import './index.scss';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Layout} from "./pages/Layout/Layout";
import {Home} from "./pages/Home/Home";
import {ThemeContextProvider} from "./context/ThemeContext";
import {CountriesContextProvider} from "./context/CountriesContext";
import {DetailPage} from "./pages/DetailPage/DetailPage";

function App() {
    return (
        <ThemeContextProvider>
            <CountriesContextProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<Layout />}>
                            <Route index element={<Home />}></Route>
                            <Route path="/:code" element={<DetailPage />}></Route>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </CountriesContextProvider>
        </ThemeContextProvider>
    );
}

export default App;
