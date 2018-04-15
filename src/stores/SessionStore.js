// @flow
import * as React from 'react';
import { observable } from 'mobx';
import { persist } from 'mobx-persist';
import BaseStore from './BaseStore';

class SessionStore extends BaseStore {
    @persist
    @observable
    accessToken = '';
    @persist
    @observable
    rememberToken = '';
}

export default SessionStore;
