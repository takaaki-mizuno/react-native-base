// @flow
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text as BaseText } from 'react-native';

import { LinearTextGradient } from 'react-native-text-gradient';
import { ThemeHelper } from '../helpers';
import Base from '../screens/Base';

export type TextProps = {
    color: string,
    children: string,
    align: 'auto' | 'left' | 'right' | 'center' | 'justify',
    numberOfLines?: number,
    width?: number,
    height?: number,
    typographyName?: string,
    fontFamily?: string,
    fontWeight?: string,
    fontSize?: number,
    lineHeight?: number,
    style: any,
};

class Text extends React.PureComponent<TextProps> {
    static defaultProps = {
        color: 'primary',
        align: 'auto',
        style: {},
    };

    computeStyle() {
        const {
            typographyName,
            align: textAlign,
            style,
            fontWeight,
            fontFamily,
            fontSize,
            lineHeight,
        } = this.props;

        let typographyData = ThemeHelper.getTypography(typographyName);
        if (typographyName) {
            typographyData = ThemeHelper.getTypography(typographyName);
        } else {
            typographyData = {
                ...{ fontWeight, fontFamily, fontSize, lineHeight },
            };
        }
        return StyleSheet.create({
            text: {
                ...{
                    textAlign,
                    lineHeight: typographyData.lineHeight,
                    fontWeight: typographyData.fontWeight,
                    fontSize: typographyData.fontSize,
                    fontFamily: typographyData.fontFamily,
                },
            },
        });
    }

    render(): React.Node {
        const {
            style,
            lineHeight,
            color: colorName,
            numberOfLines,
            children,
            typographyName,
        } = this.props;

        const typographyData = ThemeHelper.getTypography(typographyName);
        const computedStyle = this.computeStyle();

        const childElements = children ? children : '';
        const colorValue = ThemeHelper.getColor(colorName);

        const height =
            numberOfLines === 1
                ? typographyData.fontSize
                : typographyData.lineHeight * numberOfLines;

        const containerStyle = numberOfLines ? { height } : {};

        if (Array.isArray(colorValue)) {
            return (
                <View style={containerStyle}>
                    <LinearTextGradient
                        style={[style, computedStyle.text]}
                        locations={[0, 1]}
                        colors={[colorValue[0], colorValue[1]]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        {childElements}
                    </LinearTextGradient>
                </View>
            );
        } else {
            return (
                <View style={containerStyle}>
                    <BaseText
                        style={[
                            style,
                            computedStyle.text,
                            { color: colorValue },
                        ]}
                        {...{ numberOfLines }}
                    >
                        {childElements}
                    </BaseText>
                </View>
            );
        }
    }
}

export default Text;
