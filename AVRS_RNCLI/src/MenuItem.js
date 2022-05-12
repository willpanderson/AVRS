import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';

import { getDownloadURL, getStorage, ref } from 'firebase/storage';

export default function MenuItem(props) {
    const [itemUrl, setItemUrl] = useState('/Users/noahwalker/AVRS/AVRS_RNCLI/src/img/white.png');

    const getImage = (image, name) => {
        const storage = getStorage();
        console.log("getImage", image);
        const starsRef = ref(storage, image);
        let test = "";

        getDownloadURL(starsRef)
            .then((url) => {
                // console.log("2 works", url);

                // setSource([]);
                // let urlTemp = source;

                // if(urlTemp.length === 0) {
                //     urlTemp.pop();
                // }
                // urlTemp.pop();
                // urlTemp.push(url);
                setItemUrl(url)

                // setSource(url); 
                console.log("2 source", url);
                return url;
            })
            .catch((error) => {
                console.log("2 not work", error.message);
                console.log(error);
            });
            // Need to add a snack component that gets an image specific to the snack
    }

    useEffect(() => {
        getImage(props.thing.image, props.thing.Name);
    }, [])

    return (
        <View>
            <Pressable
                onPress={() => props.onSnackPress(props.thing.Name)}
                style={({ pressed }) => [
                    styles.menuItem,
                    pressed ? { opacity: 0.8 } : {},
                ]}>
                
                <Image
                    style={styles.imageStyle}
                    source={{
                        uri: itemUrl
                    }} 
                    />  
                <Text>{props.thing.Name}</Text>
            </Pressable>
            {/* <Text>{itemUrl}</Text> */}
        </View>
  )
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
	}

})