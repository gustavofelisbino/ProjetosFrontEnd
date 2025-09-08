import { Hooks } from "./Hooks/Hooks";
import Header from "../../components/Header/Header";
import { Redux } from "./Redux";
import { MaterialUI } from "./MaterialUI";
import { I18n } from "./I18n";
import { Yup } from "./Yup";
import { Axios } from "./Axios";

const PaginaInicialPage: React.FC = () => {
    return (
        <div className="theme-dark">
            <Header />
            <Hooks />
            <Redux />
            <MaterialUI />
            <I18n />
            <Yup />
            <Axios />
        </div>
    )
}

export default PaginaInicialPage
