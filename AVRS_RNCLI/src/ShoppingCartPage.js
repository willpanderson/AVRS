import { View, Text, Pressable, StyleSheet } from 'react-native';
import React, { useState } from 'react';

import CartItem from './CartItem';

import { db } from '../firebase';
import { doc, setDoc } from "firebase/firestore"; 

export default function ShoppingCartPage(props) {
    const [orderNum, setOrderNum] = useState('');


    const placeOrder = () => {
        let order = Math.floor(100000 + Math.random() * 900000);
        let snacks = [];
        for(let i = 0; i < props.cart.length; i++) {
            for(let j = 0; j < props.cart[i].count; j++) {
                snacks.push(props.cart[i].name);
            }
        }
        console.log(props.cart);
        console.log(snacks);

        setDoc(doc(db, 'orders', String(order)), {'Snacks': snacks});
        props.setCart([]);
        setOrderNum(String(order));
    }

    return (
        <View style={styles.container}>

            <View style={styles.headerContainer}>
                <Text style={styles.header}>Shopping Cart</Text>
            </View>

            <View style={styles.itemsContainer}>
                {props.cart.map((item, index) => (
                    <>
                        {item.count > 0 && (
                            <CartItem key={index} item={item}/>
                        )}
                    </>
            ))}
                <Text>{orderNum}</Text>
            </View>

            <View style={styles.buttonContainer}>
                <Pressable
                    style={({ pressed }) => [
                        styles.button,
                        pressed ? { opacity: 0.8 } : {},
                    ]}
                    onPress={() => placeOrder()}>
                    <Text style={styles.buttonText}>Place Order</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'blue',
        width: '100%',
    },
    headerContainer: {
        flex: 1,
        justifyContent: 'center',
        // backgroundColor: 'red',
        width: '100%',
    },
    itemsContainer: {
        flex: 4,
        justifyContent: 'flex-start',
        width: '100%',
        // backgroundColor: 'yellow',
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        // backgroundColor: 'green',
    },
    header: {
        margin: 10,
        fontSize: 30,
        fontWeight: 'bold',
    },
    button: {
        width: 200,
        height: 50,
        backgroundColor: '#05111B',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        margin: 15,
    },
    buttonText: {
        color: '#DBDDDF',
    },
})