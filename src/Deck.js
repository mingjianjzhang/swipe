import React, { Component } from 'react';
import { 
	StyleSheet, 
	View, 
	Animated, 
	Text, 
	Image, 
	PanResponder,
	Dimensions 
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
class Deck extends Component {
	constructor(props) {
  
		super(props);
		const position = new Animated.ValueXY();
		const panResponder = PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onPanResponderMove: (event, gesture) => {
				position.setValue({ x: gesture.dx , y: gesture.dy })
			},
			onPanResponderRelease: (event, gesture) => {
				if (gesture.dx > SWIPE_THRESHOLD) {
					this.forceSwipe('right');
				} else if (gesture.dx < -SWIPE_THRESHOLD){
					this.forceSwipe('left');	
				} else {
					this.resetPosition();
				}
			}
		});
		this.state = { panResponder, position, index: 0 };
	
	}
	
	forceSwipe(direction){
		Animated.timing(this.state.position, {
			toValue: { x: direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH, y: 0 }
			, duration: 250
		}).start(() => this.onSwipeComplete(direction));
	}

	onSwipeComplete(direction) {
		const { onSwipeLeft, onSwipeRight, data } = this.props;
		const item = data[this.state.index];

		direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);
		this.state.position.setValue({ x: 0, y: 0 });
		this.setState({ index: this.state.index + 1});
	}

	resetPosition(){
		Animated.spring(this.state.position, {
			toValue: {x: 0, y: 0}
		}).start();
	}

	getCardStyle(){
		const { position } = this.state;
		const rotate = position.x.interpolate({
			inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
			outputRange: ['-120deg', '0deg', '120deg']
		});

		return {
			...position.getLayout(),
			transform: [{ rotate }]
		};
	}

	componentWillMount(){

	}
	
	renderCards(){
		if (this.state.index >= this.props.data.length) {
			return this.props.renderNoMoreCards();
		}

		return this.props.data.map( (item, index) => {
			if ( index < this.state.index ) { return null; }

			if (index === this.state.index) {
				return (
					<Animated.View
						key={item.id} 
						style={[this.getCardStyle(), styles.cardStyle, {zIndex: 1}]}
						{...this.state.panResponder.panHandlers} 
					>
						{this.props.renderCard(item)}
					</Animated.View>
				)
			}
			return (
				<View key={item.id} style={styles.cardStyle}>
					{this.props.renderCard(item)}
				</View>
			);
		}).reverse();
	}

	render(){
		return (
			<Animated.View>
				{this.renderCards()}
			</Animated.View>
		)
	}
}

Deck.defaultProps = {
	onSwipeRight: () => {},
	onSwipeLeft: () => {}
}

const styles = {
	cardStyle: {
		position: 'absolute',
		width: SCREEN_WIDTH,
		zIndex: 0
	}
}

export default Deck;