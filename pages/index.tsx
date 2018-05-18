// The imported libs.
import * as React from "react";

// The imported external components.
import pageWithIntl from "../app/components/hoc/PageWithIntl";
import Layout from "../app/components/layout/Layout/Layout";
import ShowList from "../app/components/lists/show/ShowList/ShowList";

// The mst store.
import { getStore } from "../app/models/show/ShowList";

// The Index's props interface.
interface IIndexProps {
  isServer: boolean;
}

export class Index extends React.Component<IIndexProps> {
  public static getInitialProps({ req }): any {
    const isServer = !!req;
    return {
      isServer
    };
  }

  public render() {
    const { isServer } = this.props;

    const store = getStore(isServer);

    return (
      <Layout>
        <ShowList showList={store} />
      </Layout>
    );
  }
}

export default pageWithIntl(Index);
