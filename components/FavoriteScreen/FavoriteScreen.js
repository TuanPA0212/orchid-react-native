import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableHighlight,
  Alert,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const FavoriteScreen = () => {
  const [favorites, setFavorites] = useState([]);
  const navigation = useNavigation();
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
        } catch (error) {
          console.log(error);
        }
      };
      loadFavorites();
    }, [])
  );

  const handleDeleteAll = async () => {
    Alert.alert(
      'Confirmation',
      'Do you want to delete all from favorites?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              // Xóa toàn bộ dữ liệu trong AsyncStorage
              await AsyncStorage.clear();
              // Cập nhật danh sách yêu thích thành một mảng rỗng
              setFavorites([]);
            } catch (error) {
              console.log(error);
            }
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() =>
        navigation.navigate('Detail', {
          id: item.id,
          name: item.name,
          description: item.description,
          img: item.img,
        })
      }
    >
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
    </TouchableOpacity>
  );

  const DeleteButton = () => {
    if (favorites.length > 0) {
      return (
        <View style={styles.iconDeleteContainer}>
          <TouchableHighlight
            underlayColor="transparent"
            style={styles.iconDeleteAll}
            onPress={handleDeleteAll}
          >
            <Ionicons name="close-outline" size={30} color="grey" />
          </TouchableHighlight>
        </View>
      );
    } else {
      <View></View>;
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
      <DeleteButton />
    </View>
  );
};

export default FavoriteScreen;
