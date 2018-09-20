// The imported libs.
import { observer } from "mobx-react";
import React from "react";

// Import the mst store.
import { getStore } from "../../models/I18n";

interface II18nProps {
  messages: any;
}

export default function i18nMessagesHOC(
  Component: React.ComponentClass<II18nProps>
) {
  class I18nMessages extends React.Component {
    public render() {
      const store = getStore();
      const messages = store.messages;
      return <Component messages={messages.default} />;
    }
  }

  return observer(I18nMessages);
}
