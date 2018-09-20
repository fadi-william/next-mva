// The imported libs.
import { observer } from "mobx-react";
import React from "react";

// Import the mst store.
import { getStore } from "../../models/I18n";

@observer
class LanguageSwitcher extends React.Component {
  public render() {
    const store = getStore();

    return (
      <select
        defaultValue={store.locale}
        onChange={event => {
          store.loadLocale(event.target.value);
        }}
      >
        <option value="fr">French</option>
        <option value="en">English</option>
      </select>
    );
  }
}

export default LanguageSwitcher;
