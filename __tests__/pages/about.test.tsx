import * as React from "react";
import * as renderer from "react-test-renderer";
import AboutPage from "../../pages/about";

// Mock the i18n local storage module.
jest.mock("../../app/storage/i18n");

it("about page - snapshot test", () => {
  const tree = renderer.create(<AboutPage />).toJSON();

  expect(tree).toMatchSnapshot();
});
