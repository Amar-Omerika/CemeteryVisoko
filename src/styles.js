import {StyleSheet, Dimensions} from 'react-native';

const {height} = Dimensions.get('window');
const screenHeight = height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: '4%',
    paddingVertical: '4%',
  },

  inputTxtContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 20,
    color: 'black',
    fontFamily: 'Cantarell-Regular',
  },
});

export default styles;
