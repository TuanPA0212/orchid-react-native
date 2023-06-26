import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableHighlight,
  ImageBackground,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DetailScreen = ({ route }) => {
  const { name, description, img, id } = route.params;

  // const [isPressed, setIsPressed] = useState(route.params.isPressed);
  const [isFavorite, setIsFavorite] = useState(route.params.isFavorite);

  const handlePress = async () => {
    try {
      // Lấy danh sách yêu thích từ AsyncStorage
      const favorites = await AsyncStorage.getItem('favorites');
      let favoritesArray = [];

      if (favorites) {
        favoritesArray = JSON.parse(favorites);
      }

      if (isFavorite) {
        // Xóa khỏi danh sách yêu thích nếu đã được lưu trữ
        favoritesArray = favoritesArray.filter((item) => item.id !== id);
        setIsFavorite(false);
        await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
      } else {
        // Thêm vào danh sách yêu thích nếu chưa được lưu trữ
        const exists = favoritesArray.some((item) => item.id === id);
        if (!exists) {
          favoritesArray.push({ id, name, description, img });
          setIsFavorite(true);
          await AsyncStorage.setItem(
            'favorites',
            JSON.stringify(favoritesArray)
          );
        } else {
          alert('Sản phẩm đã được thêm vào danh sách yêu thích.');
        }
      }

      // Lưu danh sách yêu thích mới vào AsyncStorage
    } catch (error) {
      console.log(error);
    }
  };

  // Kiểm tra xem mục có trong danh sách yêu thích hay không
  const checkFavorite = async () => {
    try {
      const favorites = await AsyncStorage.getItem('favorites');
      if (favorites) {
        const favoritesArray = JSON.parse(favorites);
        const exists = favoritesArray.some((item) => item.id === id);
        setIsFavorite(exists);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      checkFavorite();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Image source={img} style={styles.img}></Image>
      <TouchableHighlight
        style={styles.icon}
        underlayColor="transparent"
        onPress={handlePress}
      >
        {isFavorite ? (
          <Ionicons name="bookmark" size={30} color="green" />
        ) : (
          <Ionicons name="bookmark-outline" size={30} color="green" />
        )}
      </TouchableHighlight>
      <SafeAreaView style={styles.textContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
      </SafeAreaView>
    </View>
  );
};

export default DetailScreen;
