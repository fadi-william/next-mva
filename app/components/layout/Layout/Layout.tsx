// The imported libs.
import * as React from "react";

// The external imported components.
import Header from "../Header/Header";

// The component style.
const layoutStyle = {
  border: "1px solid #DDD",
  margin: 20,
  padding: 20,
};

class Layout extends React.Component {

  public render() {

    const props = this.props;

    return (
      <div style={layoutStyle}>
        <Header />
        {props.children}
      </div>
    );
  }
}

export default Layout;
