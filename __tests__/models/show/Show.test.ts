import { getSnapshot } from "mobx-state-tree";
import { getStore, Show } from "../../../app/models/show/Show";

// Mock the show service.
jest.mock("../../../app/service/showService");

const show = {
    id: 975,
    image: "https://img.url/1",
    isLoading: true,
    name: "A show",
    summary: "This is the show summary",
};

const show2 = {
    id: 481,
    image: "https://img.url/2",
    isLoading: true,
    name: "A second show",
    summary: "This is the second show summary",
};

describe("show model tests", () => {

    it("can create a show model", () => {
        const showStore = Show.create(show);

        expect(showStore.id).toBe(975);
        expect(showStore.isLoading).toBe(true);
        expect(getSnapshot(showStore)).toMatchSnapshot();
    });

    it("can load the show from a web service", async () => {
        const showStore = Show.create({
            id: 975,
        });
        await showStore.getShow();

        expect(showStore.isLoading).toBe(false);
        expect(showStore.id).toBe(975);
    });

    it("can get a store on the client", () => {
        const showStore = getStore(false, 975);

        expect(showStore.id).toBe(975);
    });

    it("can get a store on the server", () => {
        const showStore = getStore(true, 975);

        expect(showStore.id).toBe(975);
    });

    it("can restore a show model from a snaphost", () => {

        const showStore = getStore(false, 975, show);

        expect(showStore.name).toBe("A show");
    });

    it("can re-instantiate the store when the show change", () => {
        const showStore = getStore(true, 975, show);
        expect(showStore.name).toBe("A show");

        const showStore2 = getStore(false, 481, show2);
        expect(showStore2.id).toBe(481);
        expect(showStore2.name).toBe("A second show");
    });
});
