// @flow
import * as React from "react";
import {Container, Text, Body, Button, View, Icon,} from "native-base";
import Swiper from "react-native-swiper";
import NavigationHelper from "../../helpers/NavigationHelper";
import autobind from "autobind-decorator";
import BaseScreen  from "../Base/Screen";
import Styles from "./Styles";

type Props = {
};

class Screen extends BaseScreen<Props> {

    @autobind
    handlePressCloseButton() {
        const {navigation} = this.props;
        NavigationHelper.reset('Root', navigation);
    }

    getStyles() {
        return parent.getStyle() & Styles;
    }

    render() {
        return (
            <Swiper
                loop={false}
                dotColor="#FFFFFF55"
                activeDotColor="#FFFFFFFF"
            >
                <View style={{backgroundColor: "#F8F8F8"}}>
                </View>
                <View style={{backgroundColor: "#99FFBB"}}>
                </View>
                <View style={{backgroundColor: "#88AA99"}}>
                </View>
                <View style={{backgroundColor: "#3399AA"}}>
                    <Container stype={{paddingTop:"50px"}}>
                        <Body style={{alignItems: "center"}}>
                        <Button onPress={this.handlePressCloseButton}>
                            <Text>Close</Text>
                        </Button>
                        </Body>
                    </Container>
                </View>
            </Swiper>
        );
    }
}

export default Screen;
