// The imported libs.
import Link from "next/link";
import React from "react";

// The component's model type.
import { TShow } from "../../../../models/show/Show";

// The component's props interface.
interface IShowProps {
  show: TShow;
}

class ShowListItem extends React.Component<IShowProps> {
  public render() {
    const show = this.props.show;

    return (
      <li>
        <Link as={`/p/${show.id}`} href={`/post?id=${show.id}`}>
          <a>{show.name}</a>
        </Link>
      </li>
    );
  }
}

export default ShowListItem;
