// @flow
import BaseStore from './BaseStore';

class RootStore extends BaseStore {
    setStores({ SessionStore = null, SettingStore = null }) {
        this.SessionStore = SessionStore;
        this.SettingStore = SettingStore;
    }

    getStores() {
        return {
            SessionStore: this.SessionStore,
            SettingStore: this.SettingStore,
        };
    }
}

export default RootStore;
