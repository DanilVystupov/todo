declare module 'vuex' {
  import { Store, createStore as _createStore, ActionContext as _ActionContext } from 'vuex';

  export function useStore<T = any>(key?: string): Store<T>;

  export const createStore: typeof _createStore;

  export interface ActionContext<S, R> {
    dispatch: VuexStore<R>['dispatch'];
    commit: VuexStore<S>['commit'];
    state: S;
    rootState: R;
    getters: any;
    rootGetters: any;
  }

  export type { Store };
}
