import { getSnapshot } from "mobx-state-tree";
import { getStore, ShowList } from "../../../app/models/show/ShowList";

// Mock the show service.
jest.mock("../../../app/service/showService");

const shows = {
    shows: [{
        id: 757,
        image: "https://img.url/1",
        name: "A show",
        summary: "This is the show summary",
    }, {
        id: 1146,
        image: "https://img.url/2",
        name: "A second show",
        summary: "This is the second show summary",
    }],
};

describe("show list model tests", () => {

    it("can create a show list model", () => {
        const showListStore = ShowList.create(shows);

        expect(showListStore.shows[0].id).toBe(757);
        expect(showListStore.isLoading).toBe(true);
        expect(getSnapshot(showListStore)).toMatchSnapshot();
    });

    it("can get total number of shows", () => {
        const showListStore = ShowList.create();

        expect(showListStore.totalShows).toBe(0);
    });

    it("can load the show list from a web server", async () => {
        const showListStore = ShowList.create();
        await showListStore.afterCreate();
        await showListStore.getShows();

        await new Promise( (res) => setTimeout(() => {
            expect(showListStore.isLoading).toBe(false);
            expect(showListStore.shows[0].id).toBe(975);
            expect(showListStore.shows[0].name).toBe("Batman");
            res();
        }, 3000));
    });

    it("can get a store on the client", () => {
        const showListStore = getStore(false);

        expect(showListStore.isLoading).toBe(true);
    });

    it("can get a store on the server", () => {
        const showListStore = getStore(true, shows);
        expect(showListStore.shows[0].id).toBe(757);
        expect(showListStore.shows[0].name).toBe("A show");
    });

    it("test before destroy lifecycle method", async () => {
        const showListStore = ShowList.create(shows);

        await showListStore.beforeDestroy();

        expect(showListStore.getShows).toThrowError();
    });
});
