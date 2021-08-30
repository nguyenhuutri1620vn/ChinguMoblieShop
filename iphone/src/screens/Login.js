import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard, Image, StyleSheet, AppRegistry, ToastAndroid } from 'react-native';
import Signup from '../screens/Signup';
import SQlite from 'react-native-sqlite-storage';
var db;
export default class Login extends Component {
    constructor(props,navigate) {
        super(props);
        this.state = { email: '', password: ''};
        db = SQlite.openDatabase({ name: 'csdulieu5.db',createFromLocation: '~csdulieu5.db'}, this.openDB, this.errDB);
    }
    openDB() {
        console.log('Kết nối cơ sở dữ liệu thành công');
    }
    errDB(e) {
        console.log(e);
    }
    openLogin = () => {
        db.transaction((tx) => {
            var sql = 'SELECT * FROM KhachHang WHERE email=\'' + this.state.email + '\' and matkhau=\'' + this.state.password + "\'";
            tx.executeSql(sql, [], (tx, results) => {
                var len = results.rows.length;
                if (this.state.email == '' || this.state.password == '') {
                    ToastAndroid.show('Hãy nhập tài khoản và mật khẩu', ToastAndroid.SHORT);
                } else if (len == 0)
                    ToastAndroid.show('Sai tài khoản hoặc mật khẩu', ToastAndroid.SHORT);
                else {
                    ToastAndroid.show('Đăng nhập thành công', ToastAndroid.SHORT);
                    this.props.navigation.navigate('root');
                }
            });
        });
    }
    render() {
        const { navigation } = this.props;
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <View style={styles.up}>
                        <Image
                            borderRadius={100}
                            fadeDuration={1000}
                            source={require('../assets/icon.png')}
                        >
                        </Image>
                        <Text style={styles.title}>
                            Welcome to Apple's store.
            </Text>
                    </View>
                    <View style={styles.down}>
                        <View style={styles.txtipcontainer}>
                            <TextInput style={styles.txtInput}
                                placeholder="Enter your email"
                                onChangeText={(email) => this.setState({ email })}
                            ></TextInput>
                        </View>
                        <View style={styles.txtipcontainer}>
                            <TextInput style={styles.txtInput}
                                placeholder="Enter your password"
                                secureTextEntry={true}
                                onChangeText={(password) => this.setState({ password })}
                            ></TextInput>
                        </View>
                        <TouchableOpacity
                            style={styles.loginbtn}
                            onPress={(this.openLogin)}
                        >
                            <Text style={styles.loginbtntitle}>LOGIN</Text>
                        </TouchableOpacity>
                        <View style={styles.signuptxt}>
                            <Text style={styles.txtsg}>Don't have an account yet? </Text>
                            <Text style={styles.lbsg} onPress={() => navigation.navigate(Signup)}>Signup</Text>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: 'rgb(234, 195, 176)'
    },
    up: {
        flex: 4,
        flexDirection: 'column',
        backgroundColor: '#89cff0',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',

    },
    down: {
        flex: 7,
        flexDirection: 'column',
        backgroundColor: '#89cff0',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    title: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        width: 400,
        marginTop: 10,
    },
    txt: {
        fontSize: 23,
        color: '#89cff0',
        width: 400,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    txtipcontainer: {
        paddingHorizontal: 10,
        backgroundColor: 'rgba(255,255,255,0.5)',
        borderRadius: 25,
        marginTop: 20,
    },
    txtInput: {
        width: 280,
        height: 45,
        borderRadius: 25
    },
    loginbtn: {
        width: 300,
        height: 45,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0492c2',
        marginTop: 20,
        borderRadius: 25
    },
    loginbtntitle: {
        fontSize: 18,
        color: 'white',
    },
    signuptxt: {
        flex: 3,
        alignItems: 'flex-end',
        marginVertical: 16,
        justifyContent: 'center',
        flexDirection: 'row'
    },
    txtsg: {
        color: '#0492c2'
    },
    lbsg: {
        color: 'white',
        fontSize: 16,

    }
})
