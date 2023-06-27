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
  {
    id: 4,
    name: 'Lan Cẩm cù',
    img: require('../../img/lan_cam_cu.png'),
    description:
      'Lan Cẩm Cù có tên khoa học là Hoya carnosa. Trên thế giới hiện nay có hàng trăm loài hoa lan Cẩm Cù, hoa khi nở có dạng chùm tròn, hình ngôi sao 5 cánh nhỏ gồm nhiều màu sắc như đỏ, hồng, trắng. Khi nở hoa tỏa hương thơm dễ chịu và cũng khá lâu tàn.',
  },
  {
    id: 5,
    name: 'Lan Long tu Lào',
    img: require('../../img/lan_long_tu.png'),
    description:
      'Long tu Lào là loại dễ chăm sóc và dễ ra hoa nhất và thường ra hoa đều hằng năm chứ ít khi nảy chồi. Hoa thường có hương thơm, đẹp, nở vào dịp tết nguyên đán nên rất được ưa chuộng. Có nhiều loại long tu, nhưng nên chọn những cây có thân dài mang nhiều sắc tím sẽ cho hoa màu tím đậm, hương thơm hơn loại thân trắng hoa cánh trắng họng vàng ít thơm.',
  },
  {
    id: 6,
    name: 'Lan Hạc vỹ',
    img: require('../../img/lan_hac_vy.png'),
    description:
      'Lan có tên khoa học là Dendrobium aphyllum, là loài có hoa rất đẹp mọc thành từng chùm dài có hình dáng như những chú hạc đang bay trên bầu trời. Hoa có màu tím nhạt hoặc hồng nhạt dần về giữa thường có nụ vào cuối thu và nở vào mùa đông.',
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
      } else {
        setIsFavorite(false);
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
