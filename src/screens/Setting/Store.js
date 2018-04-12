// @flow
import * as React from "react";
import {observable} from "mobx";

class Store {
    @observable email = '';
    @observable password = '';
}

export default Store;
