import { I18n } from "i18n-js";

import en from "./locales/en";
import vi from "./locales/vi";
import es from "./locales/es";
import pt from "./locales/pt";
import fr from "./locales/fr";
import ru from "./locales/ru";

const i18n = new I18n({
    en: en,
    vi: vi,
    es: es,
    pt: pt,
    fr: fr,
    ru: ru
});

export default i18n;