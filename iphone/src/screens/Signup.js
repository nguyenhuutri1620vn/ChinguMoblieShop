import React, { Component } from 'react';
import { Login } from '../screens/Login';
import { Image, View, Text, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard, StyleSheet, ScrollView, Alert } from 'react-native';
import SQlite from 'react-native-sqlite-storage';
var db;
export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '', phone: '', address: '', repeatpassword: '' }
        db = SQlite.openDatabase({ name: 'csdulieu5.db', createFromLocation: '~csdulieu5.db' }, this.openDB, this.errDB);
    }
    openDB() {
        console.log('Kết nối cơ sở dữ liệu thành công');
    }
    errDB(e) {
        console.log(e);
    }
    register_user = () => {
        db.transaction((tx) => {
            var sql = 'INSERT INTO KhachHang (email, matkhau, sdt, diachi) VALUES (\'' + this.state.email + '\',\'' + this.state.password + '\',\'' + this.state.phone + '\',\'' + this.state.address + '\')';
            tx.executeSql(sql, [], (tx, results) => {
                var dodai = this.state.password;
                if (this.state.email == '' || this.state.password == '' || this.state.repeatpassword == '' || this.state.phone == '' || this.state.address == '') {
                    Alert.alert('Thông báo', 'Hãy nhập đầy đủ thông tin', [{ text: 'OK' },], { cancelable: false });
                } else if (dodai.length < 6) {
                    Alert.alert('Thông báo', 'Mật khẩu phải trên 6 ký tự', [{ text: 'OK' },], { cancelable: false });
                }
                else if (this.state.password != this.state.repeatpassword) {
                    Alert.alert('Thông báo', 'Nhập lại mật khẩu không chính xác', [{ text: 'OK' },], { cancelable: false });
                }
                else if (results.rowsAffected > 0) {
                    Alert.alert(
                        'Đăng ký thành công',
                        'Bạn có thể đăng nhập ngay bây giờ',
                        [
                            {
                                text: 'OK',
                                onPress: () => this.props.navigation.navigate('Login'),
                            },
                        ],
                        { cancelable: false }
                    );
                } else alert('Đăng ký thất bại');
            });
        });
    }
    render() {
        const { navigation } = this.props;
        return (
            <ScrollView>
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
                                Webcome to Apple's store.
            </Text>
                        </View>
                        <View style={styles.down}>
                            <View style={styles.txtipcontainer}>
                                <TextInput style={styles.txtInput}
                                    placeholder="Enter your email"
                                    textContentType='emailAddress'
                                    keyboardType='email-address'
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
                            <View style={styles.txtipcontainer}>
                                <TextInput style={styles.txtInput}
                                    placeholder="Enter repeat your password"
                                    secureTextEntry={true}
                                    onChangeText={(repeatpassword) => this.setState({ repeatpassword })}
                                ></TextInput>
                            </View>
                            <View style={styles.txtipcontainer}>
                                <TextInput style={styles.txtInput}
                                    placeholder="Enter your phone"
                                    onChangeText={(phone) => this.setState({ phone })}
                                ></TextInput>
                            </View>
                            <View style={styles.txtipcontainer}>
                                <TextInput style={styles.txtInput}
                                    placeholder="Enter your address"
                                    onChangeText={(address) => this.setState({ address })}

                                ></TextInput>
                            </View>
                            <TouchableOpacity
                                style={styles.loginbtn}
                                onPress={(this.register_user)}
                            >
                                <Text style={styles.loginbtntitle}>Register</Text>
                            </TouchableOpacity>
                            <View style={styles.signuptxt}>
                                <Text style={styles.txtsg}>Already have an account ? Get </Text>
                                <Text style={styles.lbsg} onPress={() => navigation.goBack()}>Login</Text>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
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
