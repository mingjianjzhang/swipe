import React, { Component } from 'react';
import { StyleSheet, View, Animated, Text, Image } from 'react-native';

class Deck extends Component {

	componentWillMount(){
		console.log(this.props, "my deck props");
	}

	renderCards(){
		return this.props.data.map( item => {
			return this.props.renderCard(item)
		})
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