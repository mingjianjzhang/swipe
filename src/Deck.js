import React, { Component } from 'react';
import { StyleSheet, View, Animated, Text, Image, PanResponder } from 'react-native';

class Deck extends Component {
	constructor(props) {
		super(props);
		
		const position = new Animated.ValueXY();
		const panResponder = PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onPanResponderMove: (event, gesture) => {
				position.setValue({ x: gesture.dx , y: gesture.dy })
			},
			onPanResponderRelease: () => {}
		});
		this.state = { panResponder, position };
	
	}
	
	componentWillMount(){

	}
	
	renderCards(){
		return this.props.data.map( (item, index) => {
			if (index === 0) {
				return (
					<Animated.View 
						style={this.state.position.getLayout()}
						{...this.state.panResponder.panHandlers} 
					>
						{this.props.renderCard(item)}
					</Animated.View>
				)
			}
			return this.props.renderCard(item)
		});
	}
	render(){
		return (
			<Animated.View>
				{this.renderCards()}
			</Animated.View>
		)
	}
}

export default Deck;