import { getSnapshot } from "mobx-state-tree";
import { getStore, I18n } from "../../app/models/I18n";

// Import the i18n json files.
import * as enTranslatedData from "../../lang/en.json";
import * as frTranslatedData from "../../lang/fr.json";

// Mock the i18n local storage module.
jest.mock("../../app/storage/i18n");

const i18nObj = {
    locale: "en",
    messages: enTranslatedData,
};

describe("i18n model tests", () => {

    it("can create an i18n model", () => {
        const i18nStore = I18n.create(i18nObj);

        expect(i18nStore.messages).toEqual(enTranslatedData);
        expect(getSnapshot(i18nStore)).toMatchSnapshot();
    });

    it("can change language", () => {
        const i18nStore = I18n.create(i18nObj);
        i18nStore.loadLocale("fr");

        expect(i18nStore.messages).toEqual(frTranslatedData);
        expect(getSnapshot(i18nStore)).toMatchSnapshot();
    });

    it("can get a store", () => {
        const locale = "en";
        const i18nStore = getStore(locale);

        expect(i18nStore.messages).toEqual(enTranslatedData);
        expect(getSnapshot(i18nStore)).toMatchSnapshot();
    });

    it("can restore am i18n model from a snaphost", () => {
        const locale = "en";
        const i18nStore = getStore(locale, i18nObj);

        expect(i18nStore.messages).toEqual(enTranslatedData);
        expect(getSnapshot(i18nStore)).toMatchSnapshot();
    });
});
