import * as React from "react";
import * as renderer from "react-test-renderer";

// Import Enzyme.
import Enzyme from "../../../utils/enzyme";

import LanguageSwitcher from "../../../app/components/i18n/LanguageSwitcher";

// The mst store.
import { getStore } from "../../../app/models/I18n";

// Mock the i18n local storage module.
jest.mock("../../../app/storage/i18n");

it("test language switcher component - snapshot test", () => {
  const tree = renderer.create(<LanguageSwitcher />).toJSON();

  expect(tree).toMatchSnapshot();
});

it("test language switcher component's select options", () => {
  const wrapper = Enzyme.mount(<LanguageSwitcher />);
  expect(wrapper.find("select>option").length).toBe(2);
});

it("test language switcher component in action", () => {
  const wrapper = Enzyme.mount(<LanguageSwitcher />);
  expect(wrapper.find("select>option").length).toBe(2);

  expect(wrapper.find("select").prop("defaultValue")).toBe("en");
  wrapper.find("select").simulate("change", { target: { value: "fr" } });
  expect(wrapper.find("select").prop("defaultValue")).toBe("fr");

  const store = getStore();
  expect(store.locale).toBe("fr");
});
