import {View, Text, Pressable, Image, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';

import {getDownloadURL, ref} from 'firebase/storage';
import {SnackType} from '../@types';
import {storage} from '../../firebase';

export default function MenuItem(props: {
  snack: SnackType;
  onSnackPress: (arg0: any) => void;
}) {
  const [itemUrl, setItemUrl] = useState(
    '/Users/noahwalker/AVRS/AVRS_RNCLI/src/img/white.png',
  );

  const getImage = (image: string | undefined) => {
    const starsRef = ref(storage, image);

    getDownloadURL(starsRef)
      .then(url => {
        setItemUrl(url);
        return url;
      })
      .catch(error => {
        console.log('2 not work', error.message);
        console.log(error);
      });
  };

  useEffect(() => {
    getImage(props.snack.image);
  }, [props.snack.Name, props.snack.image]);

  return (
    <View>
      <Pressable
        onPress={() => props.onSnackPress(props.snack.Name)}
        style={({pressed}) => [styles.menuItem, pressed ? {opacity: 0.8} : {}]}>
        <Image
          style={styles.imageStyle}
          source={{
            uri: itemUrl,
          }}
        />
        <Text>{props.snack.Name}</Text>
      </Pressable>
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
