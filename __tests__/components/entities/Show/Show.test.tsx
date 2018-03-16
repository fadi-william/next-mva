import * as React from "react";
import * as renderer from "react-test-renderer";
import { Show as ShowMST } from "../../../../app/models/show/Show";

import Show from "../../../../app/components/entities/Show/Show";

const showLoading = {
    id: 975,
    isLoading: true,
};

const showNotLoading = {
    id: 975,
    image: "https://img.url/1",
    isLoading: false,
    name: "A show",
    summary: "This is the show summary",
};

// Mock the show service.
jest.mock("../../../../app/service/showService");

it("show entity while loading - snapshot test", () => {
    const showStore = ShowMST.create(showLoading);

    const tree = renderer.create(
        <Show show={showStore} />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
});

it("show entity after loading - snapshot test", () => {
    const showStore = ShowMST.create(showNotLoading);

    const tree = renderer.create(
        <Show show={showStore} />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
});
