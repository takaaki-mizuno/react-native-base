// @flow
import * as React from 'react';
import { Text, View } from 'react-native';
import { ThemeHelper } from '../helpers';

export type Props = {
    name: string,
    color: string,
    size: number,
    style: any,
};
import { LinearTextGradient } from 'react-native-text-gradient';

class Icon extends React.PureComponent<Props> {
    static defaultProps = {
        color: 'primary',
        size: 32,
        style: {},
    };

    static glyphs = {
        check: 0xf00c,
        setting: 0xf013,
        home: 0xf015,
        drawer: 0xf0c9,
        left: 0xf104,
        right: 0xf105,
        up: 0xf106,
        down: 0xf107,
        share: 0xf124,
        user: 0xf2be,
    };

    render() {
        const { name, size, color, style, ...props } = this.props;

        let glyph = name ? Icon.glyphs[name] || '?' : '';
        if (typeof glyph === 'number') {
            glyph = String.fromCharCode(glyph);
        }

        const colorValue = ThemeHelper.getColor(color);

        const styleDefaults = {
            fontSize: size,
        };

        const styleOverrides = {
            fontFamily: 'icomoon',
            fontWeight: 'normal',
            fontStyle: 'normal',
            color: !Array.isArray(colorValue) ? colorValue : null,
        };

        this.root = null;
        this.handleRef = ref => {
            this.root = ref;
        };

        props.ref = this.handleRef;
        props.style = [styleDefaults, style, styleOverrides];

        if (Array.isArray(colorValue)) {
            return (
                <View style={[style, { height: size }]}>
                    <LinearTextGradient
                        {...props}
                        locations={[0, 1]}
                        colors={[colorValue[0], colorValue[1]]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        {glyph}
                        {props.children}
                    </LinearTextGradient>
                </View>
            );
        } else {
            return (
                <View style={{ height: size }}>
                    <Text {...props}>
                        {glyph}
                        {props.children}
                    </Text>
                </View>
            );
        }
    }
}

export default Icon;
