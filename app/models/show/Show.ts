// The imported libs.
import { applySnapshot, flow, types } from "mobx-state-tree";
import { getShow } from "../../service/showService";

export type TShow = typeof Show.Type;

// The module's global variables.
let store: TShow = null;

// If the id changed, we will re-initialize the store *(on the client-side).
let currentShowId: number = null;

export const Show = types.model({
    id: types.maybe(types.identifier(types.number)),
    image: types.maybe(types.string),
    isLoading: types.optional(types.maybe(types.boolean), true),
    name: types.maybe(types.string),
    summary: types.maybe(types.string),
})
.actions( (self) => ({
    doneLoading() {
        self.isLoading = false;
    },
}))
.actions( (self) => ({
    getShow: flow(function *() {
        const response = yield getShow(self.id);

        if (response.data) {
            const show = Object.assign({}, response.data);

            show.id = Number(response.data.id);
            show.image = response.data.image.medium;

            applySnapshot(self, show);

            self.doneLoading();
        }
    }),
}))
.actions( (self) => ({
    afterCreate() {
        self.getShow();
    },
}));

// Utility function - Instantiates a part of the mobx-state-tree store.
export function getStore(isServer, showId, snapshot = null) {
    // If this is the server.
    if (isServer) {
      currentShowId = showId;
      store = Show.create({
          id: showId,
      });
    }
    if (store === null || currentShowId !== showId) {
        currentShowId = showId;
        store = Show.create({
            id: showId,
        });
    }
    if (snapshot) {
      applySnapshot(store, snapshot);
    }
    return store;
}
