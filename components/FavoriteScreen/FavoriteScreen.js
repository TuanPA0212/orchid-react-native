import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableHighlight } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';

const FavoriteScreen = () => {
  const [favorites, setFavorites] = useState([]);
  const handleDelete = async (id) => {
    try {
      // Lấy danh sách yêu thích từ AsyncStorage
      const favoritesData = await AsyncStorage.getItem('favorites');
      if (favoritesData) {
        const favoritesArray = JSON.parse(favoritesData);

        // Xóa mục khỏi danh sách dựa trên id
        const updatedFavorites = favoritesArray.filter(
          (item) => item.id !== id
        );

        // Cập nhật danh sách yêu thích trong AsyncStorage
        await AsyncStorage.setItem(
          'favorites',
          JSON.stringify(updatedFavorites)
        );

        // Cập nhật danh sách yêu thích trong state
        setFavorites(updatedFavorites);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const loadFavorites = async () => {
        try {
          // Lấy danh sách yêu thích từ AsyncStorage
          const favoritesData = await AsyncStorage.getItem('favorites');
          if (favoritesData) {
            setFavorites(JSON.parse(favoritesData));
          }
          console.log('useFocusEffect has been called');
        } catch (error) {
          console.log(error);
        }
      };
      loadFavorites();
    }, [])
  );

  // const handleDelete = async () => {
  //   try {
  //     // Xóa toàn bộ dữ liệu trong AsyncStorage
  //     await AsyncStorage.clear();
  //     // Cập nhật danh sách yêu thích thành một mảng rỗng
  //     setFavorites([]);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableHighlight
        style={styles.iconContainer}
        underlayColor="transparent"
        onPress={() => handleDelete(item.id)}
      >
        <Ionicons name="trash-outline" size={30} color="red" />
      </TouchableHighlight>
      <Image source={item.img} style={styles.img} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{item.name}</Text>
        <Text numberOfLines={3}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

export default FavoriteScreen;
