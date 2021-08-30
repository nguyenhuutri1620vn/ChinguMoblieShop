import React, { Component, useState, useEffect } from 'react';

import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    FlatList,
    LogBox,
    TouchableOpacity,
} from 'react-native';
import SQlite from 'react-native-sqlite-storage';
var db;
const CartHistory = ({ route }) => {
    db = SQlite.openDatabase({ name: 'csdulieu5.db', createFromLocation: '~csdulieu5.db' });
    let [flatListItems, setFlatListItems] = useState([]);
    let [idhd, setIDHD] = useState('')
    let [soluong, setSOLUONG] = useState('')
    let [idsp, setIDSP] = useState('')
    let [thanhtien, setTHANHTIEN] = useState('')
    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT HD.IDHD, HD.ThanhTien, CT.Soluong, CT.IDSP FROM HoaDon HD, CTHoaDon CT where HD.IDHD=CT.IDHD',
                [],
                (tx, results) => {
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i)
                        temp.push(results.rows.item(i));
                        setFlatListItems(temp);
                }
                
            );
        });
    }, []);
    let listItemView = (item) => {
        console.log(item.IDHD);
        return (
            <View>
                <View style={styles.itemcart}>
                    <View style={styles.areainf}>
                        <Text style={styles.txt}>Số hóa đơn: {item.IDHD}</Text>
                        <Text style={styles.txt}>ID sản phẩm: {item.IDSP}</Text>
                        <Text style={styles.txt}>Số lượng đã mua: {item.Soluong}</Text>
                        <Text style={styles.txt}>Thành tiền: {item.ThanhTien}</Text>
                    </View>
                </View>
            </View>
        );
    };
    return (
        <View style={styles.container}>
            <View style={styles.areacart}>
                <ScrollView>
                    <View style={styles.title}>
                        <Text style={styles.txttitle}>CART History</Text>
                    </View>
                    <View>
                        <FlatList
                            data={flatListItems}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => listItemView(item)}
                            numColumns={1}
                        />
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}
export default CartHistory
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
        margin: 1,
        fontSize: 15
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
        fontSize: 15
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
        marginLeft: 100,
        borderRadius: 10
    }
})