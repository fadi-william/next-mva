// The imported libs.
import { applySnapshot, types  } from "mobx-state-tree";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/map";
import { Subject } from "rxjs/Subject";

import { getShows } from "../../service/showService";
import { Show } from "./Show";

export type TShowList = typeof ShowList.Type;

// The module's global variables.
let store: TShowList = null;
const getShowsSubject$ = new Subject<void>();

export const ShowList = types.model({
    isLoading: types.optional(types.maybe(types.boolean), true),
    shows: types.optional(types.array(Show), []),
})
// The shows model's related actions.
.actions( (self) => ({
    doneLoading() {
        self.isLoading = false;
    },
    getShows() {
        // Get the latest shows.
        getShowsSubject$.next();
    },
}))
.actions( (self) => ({
    afterCreate() {
        getShowsSubject$
            .debounceTime(200)
            .map(() => {
                return getShows();
            })
            .subscribe((showsService) => {
                showsService.then((showResponse) => {
                    const shows = showResponse.data.map( (showObj) => {
                        return {
                            id: showObj.show.id,
                            name: showObj.show.name,
                        };
                    });

                    applySnapshot(self.shows, shows);

                    if (self.isLoading) {
                        self.doneLoading();
                    }
                });
            });

        // Trigger get shows.
        self.getShows();
    },
    beforeDestroy() {
        getShowsSubject$.unsubscribe();
    },
}))
// Derived data from the shows model.
.views( (self) => ({
    get totalShows() {
        return self.shows.length;
    },
}));

// Utility function - Instantiates a part of the mobx-state-tree store.
export function getStore(isServer, snapshot = null) {
    // If this is the server.
    if (isServer) {
      store = ShowList.create();
    }
    if (store === null) {
        store = ShowList.create();
    }
    if (snapshot) {
      applySnapshot(store, snapshot);
    }
    return store;
}
