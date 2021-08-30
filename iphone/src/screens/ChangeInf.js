import React, { Component, useEffect } from 'react';
import { useState } from 'react';
import { Image, View, Text, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard, StyleSheet, ToastAndroid, Alert} from 'react-native';
import SQlite from 'react-native-sqlite-storage';
var db;
export default class ChangeInf extends Component {
    constructor(props, navigation) {
        super(props);
        this.state = { passwordold: '', passwordnew: '', passwordrepeat: '' };
        db = SQlite.openDatabase({ name: 'csdulieu5.db', createFromLocation: '~csdulieu5.db' }, this.openDB, this.errDB);
    }
    UpdatePassword = () => {
        db.transaction((tx) => {
            var sql = 'SELECT * FROM KhachHang WHERE IDKH = 1 and matkhau=\'' + this.state.passwordold + "\'";
            tx.executeSql(sql, [], (tx, results) => {
                var len = results.rows.length;
                if (this.state.passwordold == '' || this.state.passwordnew == '' || this.state.passwordrepeat == '') {
                    ToastAndroid.show('Hãy nhập đầy đủ các ô trống', ToastAndroid.SHORT);
                } else if (len == 0)
                    ToastAndroid.show('Mật khẩu cũ không chính xác', ToastAndroid.SHORT);
                else if(this.state.passwordnew.length < 6){
                    ToastAndroid.show('Mật khẩu mới phải có ít nhất 6 ký tự', ToastAndroid.SHORT);
                }
                else if (this.state.passwordnew != this.state.passwordrepeat){
                    ToastAndroid.show('Nhập lại mật khẩu không đúng', ToastAndroid.SHORT);
                }else {
                    var sql = 'UPDATE KhachHang SET matkhau = '+this.state.passwordnew+' WHERE IDKH = 1';
                    tx.executeSql(sql, [], (tx, results) => {
                        if (results.rowsAffected > 0) {
                            Alert.alert(
                                'Thông báo',
                                'Thay đổi mật khẩu thành công',
                                [
                                    {
                                        text: 'OK',
                                    },
                                ],
                                { cancelable: false }
                            );
                        }
                    })
                }
            });
        });
    }
    render() {
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
                            CHANGE PASSWORD
                            </Text>
                    </View>
                    <View style={styles.down}>
                        <View style={styles.txtipcontainer}>
                            <TextInput style={styles.txtInput}
                                onChangeText={(passwordold) => this.setState({ passwordold })}
                                secureTextEntry={true}
                                placeholder='Enter your old password'
                            ></TextInput>
                        </View>
                        <View style={styles.txtipcontainer}>
                            <TextInput style={styles.txtInput}
                                onChangeText={(passwordnew) => this.setState({ passwordnew })}
                                secureTextEntry={true}
                                placeholder='Enter your new password'

                            ></TextInput>
                        </View>
                        <View style={styles.txtipcontainer}>
                            <TextInput style={styles.txtInput}
                                onChangeText={(passwordrepeat) => this.setState({ passwordrepeat })}
                                secureTextEntry={true}
                                placeholder='Repeat your new password'

                            ></TextInput>
                        </View>
                        <TouchableOpacity
                            style={styles.loginbtn}
                            onPress={this.UpdatePassword}
                        >
                            <Text style={styles.loginbtntitle}>Update</Text>
                        </TouchableOpacity>
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
        fontWeight: 'bold'
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
