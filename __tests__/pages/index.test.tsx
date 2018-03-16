import * as React from "react";
import * as renderer from "react-test-renderer";

import { Index } from "../../pages/index";

// Mock the show service.
jest.mock("../../app/service/showService");

// Mock the i18n local storage module.
jest.mock("../../app/storage/i18n");

it("index page server side rendering - snapshot test", () => {
    const props = Index.getInitialProps({req: true});

    const tree = renderer.create(
        <Index {...props} />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
});

it("index page client side rendering - snapshot test", () => {
    const props = Index.getInitialProps({req: false});

    const tree = renderer.create(
        <Index {...props} />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
});
