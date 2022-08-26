import React from 'react';
import {View, StyleSheet} from 'react-native';
import {db} from '../../firebase';
import {collection, getDocs} from 'firebase/firestore';
import MenuItem from '../components/MenuItem';
import {CartContextType, SnackType} from '../@types';
import {useCart} from '../functions/CartContext';

export default function MenuPage() {
  const [snacks, setSnacks] = React.useState<SnackType[]>([]);

  const {cart, addToCart, addCartItem} = useCart() as CartContextType;

  React.useEffect(() => {
    const snacksRef = collection(db, 'snacks');
    const fetchData = async () => {
      let snacksTemp: SnackType[] = [];
      const snapshot = await getDocs(snacksRef);
      snapshot.forEach(doc => {
        console.log(doc.id, ' => ', doc.data());
        snacksTemp.push({
          ...(doc.data() as SnackType),
        });
      });
      setSnacks(snacksTemp);
      console.log('finished');
    };
    fetchData();
  }, []);

  const onSnackPress = (key: string) => {
    console.log('on press', key);
    let temp = {
      name: '',
      count: 0,
    };
    temp.name = key;
    temp.count = 1;

    // Check if the item already is in the list
    // If yes, then add to count
    if (cart.some(item => item.name === key)) {
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].name === key) {
          addCartItem(i);
        }
      }
    } else {
      addToCart(temp);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.snacksContainer}>
        {snacks.map((snack, index) => (
          <MenuItem snack={snack} onSnackPress={onSnackPress} key={index} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageStyle: {
    width: 100,
    height: 100,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#EFF1F7',
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  snacksContainer: {
    flex: 5,
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  menuItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 150,
    margin: 10,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
  },
  header: {
    margin: 10,
    fontSize: 30,
    fontWeight: 'bold',
  },
  navBar: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-evenly',
  },
});
