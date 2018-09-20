// The imported libs.
import { observer } from "mobx-react";
import React from "react";

// The component's model type.
import { TShow } from "../../../models/show/Show";

// The Show's props interface.
interface IShowProps {
  show: TShow;
}

// Import the component styles.
import styles from "./Show.scss";

@observer
class Show extends React.Component<IShowProps> {
  public render() {
    const { show } = this.props;
    const { isLoading } = show;

    return (
      <div className={styles.show}>
        {!isLoading && (
          <div>
            <h1>{show.name}</h1>
            <p>{show.summary}</p>
            <img src={show.image} />
          </div>
        )}
        {isLoading && <div>Loading...</div>}
      </div>
    );
  }
}

export default Show;
