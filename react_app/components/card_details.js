import React from 'react';
import { View, Text } from 'react-native';

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

    changeCard = () => {
        this.setState(prevState => ({
          cardFlipBool: !prevState.cardFlipBool
        }));
    }

    userCardSwap = () => {
    this.setState(prevState => ({
      isModalVisible: !prevState.isModalVisible
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

        return (
          <View style={styles.cardContainer}>
            <BoomCard
              onPress={this.changeCard}
              title={title}
              description={description}
              imageSource={imageSource}
            />
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
