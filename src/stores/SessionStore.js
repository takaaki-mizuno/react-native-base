// @flow
import * as React from 'react';
import { observable, action } from 'mobx';
import { persist } from 'mobx-persist';
import BaseStore from './BaseStore';
import { MeRepository } from '../repositories';
import { config } from '../helpers';

class SessionStore extends BaseStore {
    @persist
    @observable
    accessToken = '';
    @persist
    @observable
    rememberToken = '';

    getClientId() {
        return config('api.clientId');
    }

    getClientSecret() {
        return config('api.clientSecret');
    }

    constructor(rootStore = null) {
        super(rootStore);
    }

    setUserInfo(user) {
        this.email = user.email;
        this.name = user.name;
        this.id = user.id;
        this.profileImageUrl = user.profileImage ? user.profileImage.url : null;
    }

    @action
    signUp(email, password, name, profileImage) {
        const meRepository = new MeRepository(this);

        const clientId = this.getClientId();
        const clientSecret = this.getClientSecret();

        return meRepository
            .signUp(email, password, name, profileImage, clientId, clientSecret)
            .then(repos => {
                if (repos.rememberToken) {
                    this.rememberToken = repos.rememberToken;
                }
                if (repos.accessToken) {
                    this.accessToken = repos.accessToken;
                    return meRepository.getMe();
                }
                this.accessToken = '';
                return new Promise(function(resolve, rejected) {
                    rejected(new Error('Cannot Take AccessToken'));
                });
            })
            .then(repos => {
                this.setUserInfo(repos);
                return new Promise(function(resolve) {
                    resolve({ isSuccess: true });
                });
            })
            .catch(error => {
                return new Promise(function(resolve, rejected) {
                    rejected({
                        isSuccess: false,
                        error: error,
                    });
                });
            });
    }

    @action
    signIn(email, password) {
        const meRepository = new MeRepository(this);

        const clientId = this.getClientId();
        const clientSecret = this.getClientSecret();

        return meRepository
            .signIn(email, password, clientId, clientSecret)
            .then(repos => {
                if (repos && repos.accessToken) {
                    if (repos.rememberToken) {
                        this.rememberToken = repos.rememberToken;
                    }
                    this.accessToken = repos.accessToken;
                    return meRepository.getMe();
                }
            })
            .then(repos => {
                this.setUserInfo(repos);
                return new Promise(function(resolve) {
                    resolve({ isSuccess: true });
                });
            })
            .catch(error => {
                return new Promise(function(resolve, rejected) {
                    rejected({
                        isSuccess: false,
                        error,
                    });
                });
            });
    }

    @action
    isSignedIn() {
        return !!this.accessToken;
    }

    @action
    getUserInfo() {
        const meRepository = new MeRepository(this);

        meRepository
            .getMe()
            .then(repos => {
                this.setUserInfo(repos);
                return new Promise(function(resolve) {
                    resolve({ isSuccess: true });
                });
            })
            .catch(error => {
                return new Promise(function(resolve, rejected) {
                    rejected({
                        isSuccess: false,
                        error,
                    });
                });
            });
    }

    @action
    signOut() {
        const meRepository = new MeRepository(this);

        meRepository
            .signOut()
            .then(repos => {
                console.log(repos);
                if (repos && repos.isSuccess) {
                    this.accessToken = '';
                    this.rememberToken = '';
                    this.name = '';
                    this.email = '';
                    this.profileImageUrl = null;

                    return new Promise(function(resolve) {
                        resolve({ isSuccess: true });
                    });
                }
            })
            .catch(error => {
                return new Promise(function(resolve, reject) {
                    reject({ error, isSuccess: false });
                });
            });
    }
}

export default SessionStore;
