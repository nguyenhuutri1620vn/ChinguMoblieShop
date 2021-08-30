import React, { } from 'react';
import { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    FlatList,
    Alert,
    LogBox,
    ToastAndroid
} from 'react-native';
import SQlite from 'react-native-sqlite-storage';
var db;
const Cart = ({ route, navigation }) => {
    db = SQlite.openDatabase({ name: 'csdulieu5.db', createFromLocation: '~csdulieu5.db' });
    let { listchose } = route.params;
    let hd = 0
    let tachid = () => {
        var text = ''
        for (var i = 0; i < listchose.length; i++) {
            text += listchose[i].id
        }
        return text
    }
    let tachsl = () => {
        var text = 0
        for (var i = 0; i < listchose.length; i++) {
            text += listchose[i].number
        }
        return text
    }
    let tachgia = () => {
        var text = 0
        for (var i = 0; i < listchose.length; i++) {
            text += listchose[i].price
        }
        return text
    }
    let Luu = () => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
        hd=hd+1
        console.log(hd);
        db.transaction((tx) => {
            tx.executeSql(
                'INSERT INTO CTHoaDon (IDHD, IDSP, Soluong) VALUES (\'' + 4 + '\',\'' + tachid() + '\',\'' + tachsl() + '\')',
                [],
                (tx, results) => {
                    if (results.rowsAffected > 0) {
                        Alert.alert(
                            'Cảm ơn bạn đã tin tưởng',
                            'Sản phẩm sẽ được giao dịch sau ít ngày',
                            [
                                {
                                    text: 'OK',
                                },
                            ],
                            { cancelable: false }
                        );
                    } else alert('Thất bại, vui lòng thử lại sau');
                }
            );
            db.transaction((tx) => {
                tx.executeSql(
                    'INSERT INTO HoaDon (IDKH, ThanhTien) VALUES (1,\'' + tachgia() + '\')',
                    [],
                    (tx, results) => {
                        if (results.rowsAffected > 0) {
                            ToastAndroid.show('Lưu thành công', ToastAndroid.SHORT);
                        }
                    }
                );
            });
        });
    };
    let showtypedt = (item) => {
        if (item.IDLOAISP == 1) {
            return 'Điện thoại thông minh';
        } else {
            return 'Máy tính bảng';
        }
    }
    // let Lay = () => {
    //     LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    //     db.transaction((tx) => {
    //         tx.executeSql(
    //             'SELECT * FROM HoaDon',
    //             [],
    //             (tx, results) => {
    //                 for (let i = 0; i < results.rows.length; ++i)
    //                 temp.push(results.rows.item(i));
    //             }
    //         )
    //     });
    // }
    // let sum = (item) => {
    //     console.log(item.price);
    // }
    return (
        <View style={styles.container}>
            <View style={styles.areacart}>
                <ScrollView>
                    <View style={styles.title}>
                        <Text style={styles.txttitle}>SHOPPING CART</Text>
                    </View>
                    <View>
                        <FlatList
                            data={listchose}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <View style={styles.itemcart}>
                                    <View style={styles.areaimage}>
                                        <Image source={{ uri: item.image }} style={styles.imageitem} />
                                    </View>
                                    <View style={styles.areainf}>
                                        <Text style={styles.txt}>Tên: {item.name}</Text>
                                        <Text style={styles.txt}>Loại sản phẩm: {showtypedt(item)}</Text>
                                        <Text style={styles.txt}>Giá: {item.price} VNĐ</Text>
                                        <TouchableOpacity style={styles.btndat}
                                            onPress={() =>
                                                Alert.alert(
                                                    'Thông báo',
                                                    'Bạn có chắc chắn muốn xóa !?',
                                                    [
                                                        { text: 'NO', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                                                        {
                                                            text: 'YES', onPress: () => {
                                                                listchose.splice(item.index, 1)

                                                            }
                                                        }
                                                    ],
                                                    { cancelable: false }
                                                )
                                            }>
                                            <Text>XÓA</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                            numColumns={1}
                            extraData={listchose}
                            refreshing={true}
                        />
                    </View>
                </ScrollView>
            </View>
            <View style={styles.areabill}>
                <View>
                    <Text style={styles.txttong}>TỔNG ĐƠN HÀNG:{tachgia()} VND</Text>
                    <TouchableOpacity style={styles.btndat}
                        onPress={Luu}>
                        <Text style={styles.txtbuy}>BUY</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
export default Cart;
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    areacart: {
        flex: 9,
        backgroundColor: '#89cff0'
    },
    areabill: {
        flex: 1
    },
    txttitle: {
        alignContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontSize: 20,
        color: '#FFFFFF',
        fontWeight: 'bold'
    },
    itemcart: {
        backgroundColor: '#FFFFFF',
        margin: 10,
        height: 100,
        borderRadius: 8,
        flexDirection: 'row',

    },
    imageitem: {
        height: 100,
        width: 80,
        borderRadius: 8,
        alignItems: 'center',
    },
    areaimage: {
        height: 100,
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    areainf: {
        margin: 10,
        paddingHorizontal: 20,

    },
    txt: {
        margin: 1
    },
    iconsoluong: {
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rowsoluong: {
        flexDirection: 'row'
    },
    soluong: {
        marginLeft: 20,
        marginRight: 20,
        fontSize: 15
    },
    btnsl: {
        backgroundColor: '#89cff0',
        borderRadius: 100,
        height: 20,
        width: 20
    },
    txttong: {
        marginLeft: 10,
        marginBottom: 10,
        marginTop: 10,
        fontSize: 15,
        fontSize: 20
    },
    areabill: {
        flexDirection: 'row',
    },
    txtbuy: {
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        color: "white",

    },
    btndat: {
        width: 80,
        height: 30,
        backgroundColor: '#FCAE1E',
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    }
})