import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DetailScreen from '../DetailScreen/DetailScreen';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const menuOrchidToDisplay = [
  {
    id: 1,
    name: 'Lan Dendro',
    img: require('../../img/Lan_Dendro.png'),
    description:
      'Đây là giống lan ưa ấm áp. Giá thể trồng là xơ dừa, than gỗ,…Loài hoa này thường được trồng trong chậu để treo ở các quán cafe, hành lang để trang trí làm cảnh rất đẹp.',
  },
  {
    id: 2,
    name: 'Lan Vũ nữ',
    img: require('../../img/Lan_Vu_Nu.png'),
    description:
      'Thường nở hoa vào mùa xuân hay mùa hạ, nhưng cũng có cây nở vào mùa thu. Giống lan này ưa độ ẩm hơn các giống lan khác, nhưng trái lại vào mùa lạnh phải tưới ít nước, nhiệt độ thích hợp với nó là 20 – 25°C.',
  },
  {
    id: 3,
    name: 'Lan Chu Đinh',
    img: require('../../img/Lan_Chu_Dinh.png'),
    description:
      'Lan Chu đinh có tên khoa học là Spathoglottis plicata. Loài hoa này thuộc giống lan đất thường trồng thành bụi, thành khóm trong chậu hoặc trên mặt đất để trang trí cảnh quan, tạo thảm hoa trong vườn, công viên, tiểu cảnh, hàng hiên nhà.',
  },
];

const Item = ({ id, name, description, img }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      checkFavorite();
    }, [])
  );

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

  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() =>
        navigation.navigate('Detail', {
          id,
          name,
          description,
          img,
          isFavorite,
        })
      }
    >
      <TouchableHighlight
        style={styles.iconContainer}
        underlayColor="transparent"
        onPress={handlePress}
      >
        {isFavorite ? (
          <Ionicons name="bookmark" size={30} color="green" />
        ) : (
          <Ionicons name="bookmark-outline" size={30} color="green" />
        )}
      </TouchableHighlight>
      <Image source={img} style={styles.img} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{name}</Text>
        <Text numberOfLines={4}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const HomeScreen = () => {
  const renderItem = ({ item }) => (
    <Item
      id={item.id}
      name={item.name}
      description={item.description}
      img={item.img}
    />
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={menuOrchidToDisplay}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default HomeScreen;
