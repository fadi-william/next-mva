import * as React from "react";
import * as renderer from "react-test-renderer";
import { getStore } from "../../../../app/models/show/ShowList";

import ShowList from "../../../../app/components/lists/show/ShowList/ShowList";

// Mock the show service.
jest.mock("../../../../app/service/showService");

it("show list item component while loading - snapshot test", () => {
    const showStore = getStore(false);
    const tree = renderer.create(
        <ShowList showList={showStore} />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
});

it("show list item component after loading - snapshot test", async () => {
    const showStore = getStore(false);
    await showStore.afterCreate();
    await showStore.getShows();

    let tree;
    await new Promise( (res) => setTimeout(() => {
        tree = renderer.create(
            <ShowList showList={showStore} />,
        ).toJSON();
        res();
    }, 3000));

    expect(tree).toMatchSnapshot();
});
