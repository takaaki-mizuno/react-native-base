// @flow
import * as React from "react";
import {StyleSheet, TouchableOpacity, TouchableNativeFeedback, View} from "react-native";
import LabelText from "../Texts/LabelText"
import DeviceHelper from "../../helpers/DeviceHelper";
import Icon from "../Icon";

type ButtonProps = {
    onPress: () => mixed,
    label?: string,
    disabled?: boolean,
    width: number,
    height: number,
    iconName?: string,
    paddingTop: number,
    paddingBottom: number,
    paddingLeft: number,
    paddingRight: number,
    style: any,
};

class RowButton extends React.PureComponent<ButtonProps> {

    static defaultProps = {
        width: DeviceHelper.getScreenWidth() - 112,
        height: 40,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 56,
        paddingRight: 56,
    };

    computeStyle() {
        const {
            width,
            height,
            paddingTop,
            paddingBottom,
            paddingLeft,
            paddingRight,
        } = this.props;
        return StyleSheet.create({
            outer: {
                flex: 1,
                alignSelf: 'stretch',
                backgroundColor: 'transparent',
                ...{width, height, paddingBottom, paddingLeft, paddingRight, paddingTop}
            },
            button: {
                backgroundColor: "#ffffff",
                borderColor: "#000000",
                borderRadius: 20,
                borderStyle: "solid",
                borderWidth: 1,
                ...{width, height}
            },
            inner: {
                flex: 1,
                flexDirection: 'row',
                flexWrap: 'nowrap',
            },
            label: {
                left: 18,
                width: width - 72,
                justifyContent: 'center',
                alignItems: 'center',
            },
            icon: {
                justifyContent: 'center',
                alignItems: 'center',
                paddingLeft: 0,
                width: 32,
                height: 32,
                left: 16,
                top: 4,
            },
        });
    }

    render(): React.Node {
        const {
            style, onPress, iconName, label, disabled, width, height
        } = this.props;
        const opacity = disabled ? 0.5 : 1;
        let Btn: React.ComponentType<*>;
        if (disabled) {
            Btn = View;
        } else if (DeviceHelper.isIOS()) {
            Btn = TouchableOpacity;
        } else {
            Btn = TouchableNativeFeedback;
        }
        const computedStyle = this.computeStyle();
        let icon = null;
        if (iconName) {
            icon = (
                <View style={computedStyle.icon}>
                    <Icon size={24} name={iconName}/>
                </View>
            );
        }
        return (
            <View style={[style, computedStyle.outer]}>
                <Btn {...{onPress}} style={computedStyle.button}>
                    <View style={computedStyle.inner}>
                        {icon}
                        <View style={computedStyle.label}>
                            <View style={{height: 18}}>
                                <LabelText size={18} align="center" fontFamily="HiraginoSans-W3">{label}</LabelText>
                            </View>
                        </View>
                    </View>
                </Btn>
            </View>
        );
    }
}

export default RowButton;
