import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';

import { db } from '../firebase';
import {collection, getDocs} from 'firebase/firestore';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';

import MenuItem from './MenuItem';

export default function MenuPage(props) {
    const [snacks, setSnacks] = useState([]);
    // Changing source array to hold objects with name = snack name and url = url
    // const [source, setSource] = useState([
    //     {
    //         name: '',
    //         url: '/Users/noahwalker/AVRS/AVRS_RNCLI/src/img/white.png'
    //     }]);
    const [source, setSource] = useState('/Users/noahwalker/AVRS/AVRS_RNCLI/src/img/white.png')

    // Testing downloading stuff
    const getImage = async (image, name) => {
        const storage = getStorage();
        console.log("getImage", image);
        const starsRef = ref(storage, image);
        let test = "";

        await getDownloadURL(starsRef)
            .then((url) => {
                console.log("works", url);

                // setSource([]);
                let urlTemp = source;

                // if(urlTemp.length === 0) {
                //     urlTemp.pop();
                // }
                // urlTemp.pop();
                // urlTemp.push(url);
                setSource(url)

                // setSource(url); 
                console.log("source", source);
                return url;
            })
            .catch((error) => {
                console.log("not work", error.message);
                console.log(error);
            });
            // Need to add a snack component that gets an image specific to the snack
    }

    //Test stuff
    const getImageTwo = (image, index) => {
        const storage = getStorage();
        console.log("getImage", image);
        const starsRef = ref(storage, image);
        let test = "";

        getDownloadURL(starsRef)
            .then((url) => {
                console.log("works:", url);
                console.log("item:", snacks);

                // setSource([]);
                // let urlTemp = source;

                // if(urlTemp.length === 0) {
                //     urlTemp.pop();
                // }
                // urlTemp.pop();
                // urlTemp.push(url);
                setSource(url)

                // setSource(url); 
                // console.log("source", source);
                return url;
            })
            .catch((error) => {
                console.log("not work", error.message);
                console.log(error);
            });
            // Need to add a snack component that gets an image specific to the snack
    }
    // 

    //Stuff to do:
    // Format the buttons to be in a two wide grid
    // Give the buttons some better styling

    const testFunction = async (image, name) => {
        // let outPut = await getImage(image, name);
        console.log("Test", source);
    };

    useEffect(() => {

        // setSource([]);
        const snacksRef = collection(db, 'snacks');
        //console.log(snacksRef.docs);
        getDocs(snacksRef)
            .then((snapshot) => {
                let snacksTemp = [];
                snapshot.docs.forEach((doc, index) => {
                    // console.log(doc.data().image);
                    // getImage(doc.data().image)
                    //     .then(url => {
                    //         setSource(url);
                    //         console.log("then", url);
                    //     })
                    //     .catch(error => {
                    //         console.log(error);
                    //     });
                    // console.log("test function", testFunction(doc.data().image, index));
                    // console.log(tempUrl);
                    // console.log(source);
                    // let dude = getImage(doc.data().image, index);
                    // console.log(source);
                    snacksTemp.push({ ...doc.data(), url: 'bob' });
                });
                console.log("in then", snacksTemp);
                setSnacks(snacksTemp);
                // getImageTwo(doc.data().image, index)
                // console.log("hello", source);
            })
            .catch(err => {
                console.log(err.message);
            });
        console.log("help:", snacks);
    }, []);

    const onSnackPress = (key) => {
        console.log("on press", key);
        let temp = {};
        temp["name"] = key;
        temp["count"] = 1;

        // Check if the item already is in the list
        // If yes, then add to count
        if(props.curOrder.some(item => item.name === key)) {

            for(let i = 0; i < props.curOrder.length; i++){
                
                if(props.curOrder[i].name === key) {
                    console.log(props.curOrder[i].name);
                    props.curOrder[i].count = props.curOrder[i].count + 1;
                    // console.log(props.c)
                }
            }

            // let hold = item.count
            // item.count = hold + 1;
        }
        else {
            props.setOrder(oldOrder => [...oldOrder, temp]);
        }

        // Need to test this function!!!
        // uri: "https://firebasestorage.googleapis.com/v0/b/avrs-29e3d.appspot.com/o/chips.jpg?alt=media&token=e5751992-b5fa-4de6-a161-252cedc9514f"
        // uri: snack.url
        // getImage();
    };

    return (
        <View style={styles.container}>

            <View style={styles.headerContainer}>
                <Text style={styles.header}>Snacks</Text>
            </View>

            <View style={styles.snacksContainer}>
                {snacks.map((snack, index) => (
                    // <Pressable
                    //     key={snack.id}
                    //     onPress={() => onSnackPress(snack.Name)}
                    //     style={({ pressed }) => [
                    //         styles.menuItem,
                    //         pressed ? { opacity: 0.8 } : {},
                    //     ]}>
                    //     {/* <Image
                    //         style={styles.imageStyle}
                    //         source={{
                    //             uri: '/Users/noahwalker/AVRS/AVRS_RNCLI/src/img/white.png'
                    //         }}     
                    //     /> */}
                    //     <Text>{snack.Name} {index}</Text>
                    //     <MenuItem thing={snack}/>
                    // </Pressable>
                    <MenuItem 
                        key={snack.id}
                        thing={snack}
                        onSnackPress={onSnackPress}
                    />
                ))}
            </View>
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