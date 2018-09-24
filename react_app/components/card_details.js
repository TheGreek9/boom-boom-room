import React from 'react';
import { View } from 'react-native';

import BoomCard from '../utils/Card';
import { styles } from '../utils/StyleSheet';
import BoomButton from '../utils/Button';
import { UserListModal } from '../utils/GameModals';

export default class CardDetails extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            cardFlipBool: true,
            title: this.props.title,
            color: this.props.color,
            description: this.props.description,
            cardSwap: this.props.cardSwap,
            isModalVisible: false
        }
    }

    changeCard = () => {
        this.setState(prevState => ({
          cardFlipBool: !prevState.cardFlipBool
        }));
    }

    userCardSwap = () => {
    this.setState(prevState => ({
      isModalVisible: !this.state.isModalVisible
    }))
  }

    render() {
        let textShow = this.state.cardFlipBool;
        let color = this.state.color;
        let cardSwap = !this.state.cardSwap;
        let modalVisible = this.state.isModalVisible

        if (textShow) {
          imageSource = this.props.imageSource
          title=this.state.title
          description = this.state.description
        } else {
          imageSource = color
          title=`${color} Team`
          description = `You are on the ${color} Team`
        }

        return (
          <View style={styles.cardContainer}>
            <BoomCard
              onPress={this.changeCard}
              title={title}
              description="Test"
              imageSource={imageSource}
            />
            <UserListModal isModalVisible={modalVisible} onPress={this.userCardSwap}/>
            <BoomButton
            disabled={cardSwap}
            title="Card Swap"
            onPress={this.userCardSwap}
          />
          </View>
        );
    }
}
