import React, { Component } from 'react';
import { Animated, StyleSheet, View, Text } from 'react-native';

class Ball extends Component {

	componentWillMount(){
		this.position = new Animated.ValueXY(0, 0);
		Animated.spring(this.position, {
			toValue: { x: 200, y: 500 }
		}).start();
	}

	render() {
		return (

			// getLayout contains information on how to animate... 
			<Animated.View style={this.position.getLayout()}>
				<View style={styles.ball} />
				<Text> This ball moves </Text>
			</Animated.View>
		)
	}
}

const styles = StyleSheet.create({
	ball: {
		height: 60,
		width: 60,
		borderRadius: 30,
		borderWidth: 30,
		borderColor: 'black'
	}
})

export default Ball;