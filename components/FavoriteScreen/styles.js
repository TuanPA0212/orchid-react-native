import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    margin: 10,
    borderColor: 'green',
  },
  img: {
    height: '100%',
    width: '40%',
    resizeMode: 'cover',
    marginRight: 10,
    borderRadius: 20,
    maxHeight: height * 0.15,
    minHeight: height * 0.12,
  },
  iconContainer: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  icon: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'white',
    borderRadius: 100,
    padding: 5,
  },
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: 25,
  },
});

export default styles;
