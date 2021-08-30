/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import 'react-native-gesture-handler';
const ProfileItem = ({icon, name}) => (
  <View style={styles.itemContainer}>
    <Text style={[styles.itemText, { marginLeft: icon ? 20 : 0 }]}>{name}</Text>
  </View>
);
const ProfileScreen = ({route, navigation }) => {
  return (
    <ScrollView>
      <View style={styles.screenContainer}>
        <View style={styles.bodyContainer}>
          <TouchableOpacity>
            <View style={styles.userContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.welcomeText}>Welcome to Iphone store</Text>
                <Text style={styles.authText}></Text>
              </View>
            </View>
          </TouchableOpacity>
          {/*  */}
          <View style={styles.divider} />
          <TouchableOpacity onPress={() => navigation.navigate('CartHistory')}>
          <ProfileItem icon="cart-outline" name="Sản phẩm đã mua"/>
          </TouchableOpacity>
          <TouchableOpacity  onPress={() => navigation.navigate('ChangeInf')}>          
          <ProfileItem icon="star-outline" name="Đổi mật khẩu"/>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity>
          <ProfileItem icon="star-outline" name="Sửa thông tin" />
          </TouchableOpacity>
          <TouchableOpacity>
          <ProfileItem icon="star-outline" name="Cài đặt" />
          </TouchableOpacity>
          {/*  */}
          <View style={styles.divider} />
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <ProfileItem icon="headphones" name="Đăng xuất" />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  bodyContainer: {
    flex: 1,
    backgroundColor: '#ededed',
  },
  userContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 22,
    alignItems: 'center',
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1e88e5',
  },
  textContainer: {
    flex: 1,
    marginLeft: 50,
  },
  welcomeText: {
    color: 'black',
    fontSize:20
  },
  authText: {
    color: 'black',
    fontSize: 18,
    fontWeight: '500',
  },
  //
  itemContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  itemText: {
    flex: 1,
    color: '#1e1e1e',
  },
  //
  divider: {
    height: 10,
  },

});

export default ProfileScreen;
