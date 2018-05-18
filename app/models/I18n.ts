// This is a mst store to manage i18n in the application.
import { applySnapshot, types } from "mobx-state-tree";
import { addLocaleData } from "react-intl";

// Import the i18n local storage module.
import { getCurrentUserLocale, setCurrentUserLocale } from "../storage/i18n";

// Currently, we support english and french.
import * as enLocaleData from "react-intl/locale-data/en";
import * as frLocaleData from "react-intl/locale-data/fr";

// Import the i18n json files.
import * as enTranslatedData from "../../lang/en.json";
import * as frTranslatedData from "../../lang/fr.json";

export type TI18n = typeof I18n.Type;

// The module's global variables.
let store: TI18n = null;
let currentLocale = null;

export const I18n = types
  .model({
    locale: types.string,
    messages: types.optional(types.frozen, {})
  })
  .actions(self => ({
    loadLocale(lang: string) {
      self.locale = lang;
      setCurrentUserLocale(lang);
      if (lang === "en") {
        addLocaleData(enLocaleData);
        self.messages = enTranslatedData;
      } else {
        addLocaleData(frLocaleData);
        self.messages = frTranslatedData;
      }
    }
  }))
  .actions(self => ({
    afterCreate() {
      self.loadLocale(self.locale);
    }
  }));

// Utility function - Instantiates a part of the mobx-state-tree store.
export function getStore(locale?, snapshot = null) {
  if (!locale) {
    locale = getCurrentUserLocale();
    currentLocale = locale;
  }
  if (store === null || currentLocale !== locale) {
    store = I18n.create({ locale });
  }
  if (snapshot) {
    applySnapshot(store, snapshot);
  }
  return store;
}
