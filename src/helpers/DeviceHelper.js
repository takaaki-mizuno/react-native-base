import { PixelRatio, Dimensions, Platform } from 'react-native';

class DeviceHelper {

    static getPixelRatio(){
        return PixelRatio.get();
    }

    static getScreenWidth(){
        return Dimensions.get('window').width;
    }

    static getScreenHeight(){
        return Dimensions.get('window').height;
    }

    static getOS()
    {
        return Platform.OS;
    }

    static isAndroid()
    {
        return Platform.OS === 'android';
    }

    static isIOS()
    {
        return Platform.OS === 'ios';
    }

}

export default DeviceHelper;
