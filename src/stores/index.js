// @flow
import { default as _SessionStore } from './SessionStore';
import { default as _SettingStore } from './SettingStore';

import { default as _RootStore } from './RootStore';

const RootStore = new _RootStore();

export const SessionStore = new _SessionStore(RootStore);
export const SettingStore = new _SettingStore(RootStore);

RootStore.setStores({ SessionStore, SettingStore });

export default RootStore;
