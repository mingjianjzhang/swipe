import React, { Component } from 'react';
import { StyleSheet, View, Animated, Text, Image, PanResponder } from 'react-native';

class Deck extends Component {
	constructor(props) {
		super(props);
		
		const panResponder = PanResponder.create({
			onStartShouldSetPanResponder: () => {},
			onPanResponderMove: () => {},
			onPanResponderRelease: () => {}
		});

		this.state = { panResponder };
	
	}
	
	componentWillMount(){

	}
	
	renderCards(){
		return this.props.data.map( item => {
			return this.props.renderCard(item)
		});
	}
	render(){
		return (
			<View>
				{this.renderCards()}
			</View>
		)
	}
}

export default Deck;