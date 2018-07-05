// @flow
import * as React from 'react';
import {
    PixelRatio,
    Dimensions,
    Platform,
    TouchableNativeFeedback,
    View,
    TouchableOpacity,
} from 'react-native';
//import VersionNumber from 'react-native-version-number';

class DeviceHelper {
    static getPixelRatio() {
        return PixelRatio.get();
    }

    static getScreenWidth() {
        return Dimensions.get('window').width;
    }

    static getScreenHeight() {
        return Dimensions.get('window').height;
    }

    static getOS() {
        return Platform.OS;
    }

    static getOSVersion() {
        return Platform.Version;
    }

    static getAppVersion() {
        //        return VersionNumber.appVersion;
        return '0.0.1';
    }

    static isAndroid() {
        return Platform.OS === 'android';
    }

    static isIOS() {
        return Platform.OS === 'ios';
    }

    static isIPad() {
        return Platform.OS === 'ios' && Platform.isPad;
    }

    static getTouchableElement(disabled: boolean): React.ComponentType<*> {
        let Touchable: React.ComponentType<*>;
        if (disabled) {
            Touchable = View;
        } else if (DeviceHelper.isIOS()) {
            Touchable = TouchableOpacity;
        } else {
            Touchable = TouchableNativeFeedback;
        }

        return Touchable;
    }

    static getStatusBarHeight() {
        return this.isIOS() ? 20 : 0;
    }

    static isLandscape() {
        return this.getScreenWidth() > this.getScreenHeight();
    }

    static isPortrait() {
        return !this.isLandscape();
    }

    static getHeaderHeight() {
        return this.isIOS()
            ? this.isLandscape() && !this.isIPad()
                ? 32
                : 44
            : 56;
    }

    static getTitleOffset() {
        return this.isIOS() ? 70 : 56;
    }
}

export default DeviceHelper;
