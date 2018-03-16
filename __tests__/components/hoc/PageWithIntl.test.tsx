import * as React from "react";
import * as renderer from "react-test-renderer";

import pageWithIntl from "../../../app/components/hoc/PageWithIntl";
import { Index } from "../../../pages/index";

// Mock the show service.
jest.mock("../../../app/service/showService");

// Mock the i18n local storage module.
jest.mock("../../../app/storage/i18n");

it("test page with i18n hoc component with the index page - snapshot test", () => {

    const IndexWithIntl = pageWithIntl(Index);

    const tree = renderer.create(
        <IndexWithIntl />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
});

it("test page with i18n hoc component with the index page with context - snapshot test", () => {
    const context = {
        req: {
            headers: {
                cookie: "userLocale=fr;",
            },
        },
    };

    const IndexWithIntl = pageWithIntl(Index);
    IndexWithIntl.getInitialProps(context);

    const tree = renderer.create(
        <IndexWithIntl />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
});
