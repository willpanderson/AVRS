import React from 'react';

import { View, Text, Pressable, StyleSheet } from 'react-native';

const MainMenu = () => {
	return (
		<View style={styles.container}>
			<View style={styles.navBarContainer}>
				<View style={styles.navBar}>
					<Pressable
						style={({ pressed }) => [
							styles.button,
							pressed ? { opacity: 0.8 } : {},
						]}>
						<Text>Menu</Text>
					</Pressable>
					<Pressable
						style={({ pressed }) => [
							styles.button,
							pressed ? { opacity: 0.8 } : {},
						]}>
						<Text>Location</Text>
					</Pressable>
					<Pressable
						style={({ pressed }) => [
							styles.button,
							pressed ? { opacity: 0.8 } : {},
						]}>
						<Text>Cart</Text>
					</Pressable>
					<Pressable
						style={({ pressed }) => [
							styles.button,
							pressed ? { opacity: 0.8 } : {},
						]}>
						<Text>Settings</Text>
					</Pressable>
				</View>

			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	navBarContainer: {
		position: 'absolute',
		alignItems: 'center',
		bottom: 50,
	},
	navBar: {
		flexDirection: 'row',
		width: '90%',
		justifyContent: 'space-evenly',
	}

})

export default MainMenu;