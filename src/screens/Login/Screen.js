// @flow
import * as React from "react";
import { Image, Platform } from "react-native";
import { Container, Content, Text, View, Footer } from "native-base";
import BaseScreen from "../Base/Screen";
import Button from "../../components/Button";

class Login extends BaseScreen {
    render() {
        return (
            <Container>
                <Content>
                    <View padder>
                        <Button width={300} height={80} onPress={() => {}}>
                            <Text>Login</Text>
                        </Button>
                    </View>
                </Content>
                <Footer style={{ backgroundColor: "#F8F8F8" }}>
                    <View style={{ alignItems: "center", opacity: 0.5, flexDirection: "row" }}>
                        <View padder>
                            <Text style={{ color: "#000" }}>Made with love at </Text>
                        </View>
                        <Image
                            source={{ uri: "https://geekyants.com/images/logo-dark.png" }}
                            style={{ width: 422 / 4, height: 86 / 4 }}
                        />
                    </View>
                </Footer>
            </Container>
        );
    }
}

export default Login;
