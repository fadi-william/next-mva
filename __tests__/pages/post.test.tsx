import * as React from "react";
import * as renderer from "react-test-renderer";

import { Post } from "../../pages/post";

// Mock the show service.
jest.mock("../../app/service/showService");

// Mock the i18n local storage module.
jest.mock("../../app/storage/i18n");

// The post's url query param required to test the page.
const url = {
  query: {
    id: 757
  }
};

it("post page server side rendering - snapshot test", () => {
  const props = Post.getInitialProps({ req: true });

  const tree = renderer.create(<Post {...props} url={url} />).toJSON();

  expect(tree).toMatchSnapshot();
});

it("post page client side rendering - snapshot test", () => {
  const props = Post.getInitialProps({ req: false });

  const tree = renderer.create(<Post {...props} url={url} />).toJSON();

  expect(tree).toMatchSnapshot();
});
