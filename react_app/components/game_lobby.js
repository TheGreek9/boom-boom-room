import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import SocketIOClient from 'socket.io-client';

import { ngrok_game_server_site } from '../utils/EnvironmentVars';
import { MaterialHeaderButtons, hItem } from '../utils/HeaderButtons';
import CardDetails from './card_details';
import { styles } from '../utils/StyleSheet';
import {SwapRequestModal, UserNameModal} from '../utils/GameModals';


export default class GameLobbyScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <MaterialHeaderButtons>
          <hItem title="add" iconName="arrow-back" onPress={navigation.getParam('discIt')} />
        </MaterialHeaderButtons>
      ),
    };
  };

  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.state = {
        cardText: 'nothing as of yet',
        otherCard: 'nothing as of yet',
        hasCardDetails: false,
        hasSwapDetails: false,
        isModalVisible: true,
        modalVisible: false,
        userDict: {}
    }

    this.socket = SocketIOClient(ngrok_game_server_site)
    this.socket.on('gameServer', this.setData)
    this.socket.on('cardSwapRequest', this.showRequestModal)
  }

  componentDidMount() {
    this.props.navigation.setParams({ discIt: this.discIt })
  }

  discIt = () => {
    this.socket.disconnect();
    this.props.navigation.goBack();
  }

  setData = (text) => {
    this.setState(prevState => ({
      userDict: text.userDict,
      cardText: text.cardDeck,
      hasCardDetails: true
    }));
  }

  toGameLobby = (userName) => {
    this.setState(prevState => ({
      isModalVisible: !this.state.isModalVisible
    }))
    this.socket.emit('gameLobby', userName)
  }

  showRequestModal = (cardInfo) => {
    this.setState(prevState => ({
      modalVisible: true,
      otheCardUser: cardInfo[0],
      otherCardInfo: cardInfo[1]
    }));
  }

  swapCard = () => {
    let otherCard = this.state.otherCardInfo
    this.setState(prevState => ({
        cardText: otherCard,
        modalVisible: false,
        hasCardDetails: true
    }))
  }

  cancelSwap = () => {
    this.setState(prevState => ({
        modalVisible: !this.state.modalVisible
    }))
  }

  render() {
    const userDict = this.state.userDict
    const title = this.state.cardText.title
    const color = this.state.cardText.color
    const imageSource = this.state.cardText.picture
    const description = this.state.cardText.description
    const cardSwap = this.state.cardText.cardSwap
    let isModalVisible = this.state.isModalVisible
    let modalVisible = this.state.modalVisible
    const showCardDetails =
      <CardDetails
          title={title}
          color={color}
          imageSource={imageSource}
          description={description}
          cardSwap={cardSwap}
          userDict={userDict}
          socket={this.socket}
      />
    const preLobbyView =
      <Text style={styles.lobbyText}>Please wait until the leader starts the game</Text>
    const test = this.state.hasCardDetails ? showCardDetails : preLobbyView
      return (
        <View style={styles.lobbyView}>
          <UserNameModal isModalVisible={isModalVisible} onPress={this.toGameLobby}/>
          <SwapRequestModal modalVisible={modalVisible} onConfirm={this.swapCard} onCancel={this.cancelSwap}/>
          {test}
        </View>
      );
  }
}