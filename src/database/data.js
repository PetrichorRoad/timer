import { i18nDB } from "@/database/index";

export const getTranslations = async (lang) => {
    return new Promise(async (resolve, reject) => {
        const translations = await i18nDB.getAll();
        resolve(translations);
    });
}