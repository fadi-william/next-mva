// The imported libs.
import React from "react";

// The imported external components.
import Show from "../app/components/entities/Show/Show";
import pageWithIntl from "../app/components/hoc/PageWithIntl";
import Layout from "../app/components/layout/Layout/Layout";

// The mst store.
import { getStore } from "../app/models/show/Show";

// The show page's props interface.
interface IPostProps extends InjectedIntlProps {
  url: any;
  isServer: boolean;
}

export class Post extends React.Component<IPostProps> {
  public static getInitialProps({ req }) {
    const isServer = !!req;

    return {
      isServer
    };
  }

  public render() {
    const { isServer } = this.props;

    const { id } = this.props.url.query;

    // Set the id of the current show.
    const store = getStore(isServer, Number(id));

    return (
      <Layout>
        <Show show={store} />
      </Layout>
    );
  }
}

export default pageWithIntl(Post);
