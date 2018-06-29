// @flow
import autobind from 'autobind-decorator';
import * as React from 'react';
import { inject } from 'mobx-react';
import { config } from '../helpers';
import NavigationHelper from '../helpers/NavigationHelper';
import TitleText from './Texts/TitleText';
import { StyleSheet, View } from 'react-native';
import DeviceHelper from '../helpers/DeviceHelper';
import IconButton from './Buttons/IconButton';

export type HeaderProps = {
    hasBackButton: boolean,
    title: string,
    leftButtonIcons?: Array,
    rightButtonIcons?: Array,
    onLeftButtonPress?: any,
    onRightButtonPress?: any,
    onTitlePress?: any,
};

@inject('navigation')
class Header extends React.Component<HeaderProps> {
    static defaultProps = {
        hasBackButton: false,
        title: '',
    };

    @autobind
    handlePressDrawerMenuButton() {
        const { navigation } = this.props;
        NavigationHelper.openDrawer(navigation);
    }

    @autobind
    handlePressBackButton() {
        const { navigation } = this.props;
        console.log('back');
        NavigationHelper.back(navigation);
    }

    @autobind
    handleOnLeftButtonPress(index, iconName) {
        const { onLeftButtonPress } = this.props;
        if (onLeftButtonPress) {
            onLeftButtonPress(index, iconName);
        }
    }

    @autobind
    handleOnRightButtonPress(index, iconName) {
        const { onRightButtonPress } = this.props;
        if (onRightButtonPress) {
            onRightButtonPress(index, iconName);
        }
    }

    computeStyle() {
        return StyleSheet.create({
            outer: {
                flexDirection: 'row',
                height: DeviceHelper.getHeaderHeight(),
                width: DeviceHelper.getScreenWidth(),
                marginTop: DeviceHelper.getStatusBarHeight(),
                justifyContent: 'center',
                alignContent: 'center',
            },
            body: {
                height: 32,
                flexDirection: 'row',
                justifyContent: 'center',
                alignContent: 'center',
                flex: 1,
                alignItems: 'center',
                alignSelf: 'center',
                //borderWidth: 1,
                //                borderColor: "#000",
                //                borderStyle: "solid",
            },
            left: {
                position: 'absolute',
                flex: 1,
                left: 8,
                width: 32,
                alignSelf: 'center',
                alignItems: 'flex-start',
            },
            right: {
                position: 'absolute',
                flex: 1,
                flexDirection: 'row',
                right: 8,
                width: 152,
                alignSelf: 'center',
                alignItems: 'flex-end',
            },
            leftButton: {
                flex: 1,
                marginLeft: 8,
                height: 32,
                width: 32,
            },
            rightButton: {
                flex: 1,
                marginRight: 8,
                height: 32,
                width: 32,
            },
        });
    }

    getLeftButtons() {
        const { hasBackButton, leftButtonIcons } = this.props;
        const styles = this.computeStyle();
        const buttons = [];

        if (hasBackButton) {
            buttons.push(
                <View style={styles.leftButton} key={'left-back'}>
                    <IconButton
                        iconName="back"
                        onPress={this.handlePressBackButton}
                        size={32}
                        iconColor="primary"
                    />
                </View>
            );
        }

        if (leftButtonIcons && leftButtonIcons.length > 0) {
            for (const [index, iconName] of leftButtonIcons.entries()) {
                buttons.push(
                    <View style={styles.leftButton} key={'left-' + index}>
                        <IconButton
                            iconName={iconName}
                            onPress={() => {
                                this.handleOnLeftButtonPress(index, iconName);
                            }}
                            size={32}
                            iconColor="primary"
                        />
                    </View>
                );
            }
        }

        if (buttons.length > 0) {
            return buttons;
        }

        if (config('navigation.type', 'drawer') === 'drawer') {
            return (
                <IconButton
                    iconName="menu"
                    onPress={this.handlePressDrawerMenuButton}
                    size={32}
                    iconColor="primary"
                />
            );
        } else {
            return null;
        }
    }

    getRightButtons() {
        const { rightButtonIcons } = this.props;
        const styles = this.computeStyle();

        if (rightButtonIcons && rightButtonIcons.length > 0) {
            let buttons = [];
            for (const [index, iconName] of rightButtonIcons.entries()) {
                buttons.push(
                    <View style={styles.rightButton} key={'right-' + index}>
                        <IconButton
                            iconName={iconName}
                            onPress={() => {
                                this.handleOnRightButtonPress(index, iconName);
                            }}
                            size={32}
                            iconColor="primary"
                        />
                    </View>
                );
            }
            return buttons;
        }

        return null;
    }

    render() {
        const leftButtons = this.getLeftButtons();
        const rightButtons = this.getRightButtons();
        const style = this.computeStyle();
        return (
            <View style={style.outer}>
                <View style={style.body}>
                    <TitleText color={this.props.titleColor}>
                        {this.props.title}
                    </TitleText>
                </View>
                <View style={style.left}>{leftButtons}</View>
                <View style={style.right}>{rightButtons}</View>
            </View>
        );
    }
}

export default Header;
