// @flow
import themeConfig from '../config/theme';
import * as _ from 'lodash';
import { Platform } from 'react-native';

class ThemeHelper {
    static get(name: string, defaultValue = null) {
        return _.get(themeConfig, name, defaultValue);
    }

    static getColor(colorName: string) {
        if (colorName.slice(0, 1) === '#') {
            return colorName;
        }

        if (Array.isArray(colorName)) {
            return colorName;
        }

        return ThemeHelper.get(
            'colors.' + colorName,
            ThemeHelper.get('colors.primary')
        );
    }

    static getTypography(typographyName: string) {
        const typography = ThemeHelper.get(
            'typography.' + typographyName,
            ThemeHelper.get('typography.default')
        );
        if (typography.fontFamily === 'sans-serif' && Platform.OS === 'ios') {
            typography.fontFamily = 'HiraginoSans-W3';
        }

        return typography;
    }

    static getGradientColor(colorName: string) {
        const color = ThemeHelper.getColor(colorName);
        return Array.isArray(color) ? color : [color, color];
    }
}

export function theme(name: string, defaultValue = null) {
    return ThemeHelper.get(name, defaultValue);
}

export function color(colorName: string) {
    return ThemeHelper.getColor(colorName);
}

export function typography(themeName: string) {
    return ThemeHelper.getTypography(themeName);
}

export default ThemeHelper;
