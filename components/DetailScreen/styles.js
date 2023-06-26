import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 24,
  },
  img: {
    width: width * 1,
    resizeMode: 'cover',
  },
  textContainer: {
    padding: 20,
  },
  name: {
    fontSize: 20,
  },
  description: {
    paddingTop: 5,
  },
  icon: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 100,
    padding: 10,
    top: 5,
    right: 5,
  },
});

export default styles;
