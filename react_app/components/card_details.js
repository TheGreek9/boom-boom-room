import React from 'react';
import { View, Text, Animated } from 'react-native';

import BoomCard from '../utils/Card';
import { styles } from '../utils/StyleSheet';
import { MainButton, StyleButton } from '../utils/Button';
import { UserListModal } from '../utils/GameModals';

export default class CardDetails extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            cardFlipBool: true,
            isModalVisible: false
        }
    }

    componentWillMount() {
      this.animatedValue = new Animated.Value(0);
      this.value = 0;
      this.animatedValue.addListener(({ value }) => {
        this.value = value;
      })
      this.frontInterpolate = this.animatedValue.interpolate({
        inputRange: [0, 180],
        outputRange: ['0deg', '180deg'],
      })
      this.backInterpolate = this.animatedValue.interpolate({
        inputRange: [0, 180],
        outputRange: ['180deg', '360deg']
      })
    }

    flipCard = () => {
      if (this.value >= 90) {
        Animated.spring(this.animatedValue,{
          toValue: 0,
          friction: 8,
          tension: 10
        }).start();
      } else {
        Animated.spring(this.animatedValue,{
          toValue: 180,
          friction: 8,
          tension: 10
        }).start();
      }

    }

    userCardSwap = () => {
    this.setState(prevState => ({
      isModalVisible: !this.state.isModalVisible
    }))
  }

    render() {
        let textShow = this.state.cardFlipBool;
        let modalVisible = this.state.isModalVisible;
        let cardSwap = !this.props.cardSwap;
        let userDict = this.props.userDict;

        if (textShow) {

          imageSource = this.props.imageSource
          title=this.props.title
          description = this.props.description
        } else {
          imageSource = this.props.color
          title=`${this.props.color} Team`
          description = `You are on the ${this.props.color} Team`
        }

        const frontAnimatedStyle = {
          transform: [
            { rotateY: this.frontInterpolate}
          ]
        }

        const backAnimatedStyle = {
          transform: [
            { rotateY: this.backInterpolate }
          ]
        }

        return (
          <View style={styles.cardContainer}>
            <View>
              <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
                <BoomCard
                  onPress={this.flipCard}
                  title={this.props.title}
                  shareTitle={"Color Share"}
                  description={this.props.description}
                  imageSource={this.props.imageSource}
                />
              </Animated.View>
              <Animated.View style={[styles.flipCard, backAnimatedStyle, styles.flipCardBack]}>
                <BoomCard
                  onPress={this.flipCard}
                  title={`${this.props.color} Team`}
                  shareTitle={"Card Share"}
                  description={this.props.description}
                  imageSource={this.props.color}
                />
              </Animated.View>
            </View>
            <UserListModal
                isModalVisible={modalVisible}
                onPress={this.userCardSwap}
                userDict={userDict}
                socket={this.props.socket}
            />
            <StyleButton
              title="Card Swap"
              onPress={this.userCardSwap}
              disabled={cardSwap}
              style={{height: 45, width: 330, backgroundColor: '#006699'}}
            />
          </View>
        );
    }
}
