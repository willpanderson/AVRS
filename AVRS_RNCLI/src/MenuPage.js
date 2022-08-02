import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {db} from '../firebase';
import {collection, getDocs} from 'firebase/firestore';

import MenuItem from './MenuItem';

export default function MenuPage(props) {
  const [snacks, setSnacks] = useState([]);

  useEffect(() => {
    // setSource([]);
    const snacksRef = collection(db, 'snacks');
    //console.log(snacksRef.docs);
    getDocs(snacksRef)
      .then(snapshot => {
        let snacksTemp = [];
        snapshot.docs.forEach((doc, index) => {
          snacksTemp.push({...doc.data(), url: 'bob'});
        });
        console.log('in then', snacksTemp);
        setSnacks(snacksTemp);
      })
      .catch(err => {
        console.log(err.message);
      });
    console.log('help:', snacks);
  }, [snacks]);

  const onSnackPress = key => {
    console.log('on press', key);
    let temp = {};
    temp.name = key;
    temp.count = 1;

    // Check if the item already is in the list
    // If yes, then add to count
    if (props.curOrder.some(item => item.name === key)) {
      for (let i = 0; i < props.curOrder.length; i++) {
        if (props.curOrder[i].name === key) {
          console.log(props.curOrder[i].name);
          props.curOrder[i].count = props.curOrder[i].count + 1;
          // console.log(props.c)
        }
      }

      // let hold = item.count
      // item.count = hold + 1;
    } else {
      props.setOrder(oldOrder => [...oldOrder, temp]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Snacks</Text>
      </View>

      <View style={styles.snacksContainer}>
        {snacks.map((snack, index) => (
          <MenuItem key={snack.id} thing={snack} onSnackPress={onSnackPress} />
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
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'center',
    // backgroundColor: 'red',
    width: '100%',
  },
  snacksContainer: {
    flex: 5,
    width: '100%',
    // backgroundColor: 'white',
    // alignItems: 'center',
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
