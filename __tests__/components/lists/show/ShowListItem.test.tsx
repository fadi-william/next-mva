import React from "react";
import renderer from "react-test-renderer";
import { getStore } from "../../../../app/models/show/Show";

import ShowListItem from "../../../../app/components/lists/show/ShowListItem/ShowListItem";

// Mock the show service.
jest.mock("../../../../app/service/showService");

it("show list item component - snapshot test", () => {
  const showStore = getStore(false, 757);

  const tree = renderer.create(<ShowListItem show={showStore} />).toJSON();

  expect(tree).toMatchSnapshot();
});
