// The imported libs.
import { observer } from "mobx-react";
import React from "react";
import { injectIntl, IntlProvider } from "react-intl";

// Import the mst store.
import { getStore } from "../../models/I18n";

// Get the current locale.
import { getCurrentUserLocaleFromContext } from "../../storage/i18n";

// The next page component interface.
interface INextComponent<T> extends React.ComponentClass<T> {
  getInitialProps?: (context) => {};
}

// The HOC's props interface.
interface IPageWithIntlProps extends InjectedIntlProps {
  now?: Date;
}

export default (Page: INextComponent<any>) => {
  // Inject intl to the page.
  const IntlPage = injectIntl(Page);

  class PageWithIntl extends React.Component<IPageWithIntlProps> {
    public static async getInitialProps(context) {
      const props = await Page.getInitialProps(context);

      // Get the user locale from the cookies.
      const locale = getCurrentUserLocaleFromContext(context);
      // This is used to define the initial locale.
      getStore(locale);

      const now = Date.now();

      return {
        now,
        ...props
      };
    }

    public render() {
      const { now, ...props } = this.props;

      const store = getStore();

      return (
        <IntlProvider
          locale={store.locale}
          messages={store.messages}
          initialNow={now}
        >
          <IntlPage {...props} />
        </IntlProvider>
      );
    }
  }

  return observer(PageWithIntl);
};
