// The imported libs.
import Link from "next/link";
import * as React from "react";

// The external imported components.
import i18nMessagesHOC from "../../hoc/I18nMessages";
import LanguageSwitcher from "../../i18n/LanguageSwitcher";

// Import the component styles.
import "./Header.scss";

interface IHeaderProps {
  messages: any;
}

class Header extends React.Component<IHeaderProps> {
  public render() {
    const { messages } = this.props;

    return (
      <div className="Header">
        <nav>
          <Link href="/">
            <a>{messages.nav.home}</a>
          </Link>
          <Link href="/about">
            <a>{messages.nav.about}</a>
          </Link>
          <div className="lang-switcher-ph">
            <LanguageSwitcher />
          </div>
        </nav>
      </div>
    );
  }
}

export default i18nMessagesHOC(Header);
