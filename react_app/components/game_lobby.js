import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import SocketIOClient from 'socket.io-client';

import { ngrok_game_server_site } from '../utils/EnvironmentVars';
import { MaterialHeaderButtons, hItem } from '../utils/HeaderButtons';
import CardDetails from './card_details';
import { styles } from '../utils/StyleSheet';
import { SwapRequestModal, UserNameModal } from '../utils/GameModals';
import { getKeyByValue } from '../utils/Miscellaneous';


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
        hasCardDetails: false,
        hasSwapDetails: false,
        userNameModalVisible: true,
        swapReqModalVisible: false,
        userName: ''
    }

    this.socket = SocketIOClient(ngrok_game_server_site)
    this.socket.on('userConnectionCheck', this.confirmConnection)
    this.socket.on('startGame', this.setData)
    this.socket.on('cardSwapRequest', this.showRequestModal)
    this.socket.on('swapAccept', this.acceptSwap)
  }

  componentDidMount() {
    this.props.navigation.setParams({ discIt: this.discIt })
  }

  discIt = () => {
    this.socket.disconnect();
    this.props.navigation.goBack();
  }

  userInGameLobby = (userName) => {
    this.socket.emit('gameLobby', userName)
    this.setState(prevState => ({
      userNameModalVisible: !prevState.userNameModalVisible,
      userName: userName
    }))
  }

  confirmConnection = () => {
    userName = this.state.userName
    if (userName) {
      this.socket.emit('userConnectionCheck', userName)
    } else {
      this.setState(prevState => ({
      userNameModalVisible: !prevState.userNameModalVisible
    }))
    }
  }

  setData = (text) => {
    this.setState({
      cardText: text[0],
      userDict: text[1],
      hasCardDetails: true
    })
  }

  showRequestModal = (cardInfo) => {
    let senderUserName = this.state.userDict[cardInfo[0]]
    this.setState({
      swapReqModalVisible: true,
      requestCardUser: cardInfo[0],
      requestCardInfo: cardInfo[1],
      requestCardUserName: senderUserName
    })
  }

  swapCard = () => {
    swapCardInfo = [this.state.requestCardUser, this.state.cardText]
    this.socket.emit('swapAccept', swapCardInfo)
    this.setState(prevState => ({
        cardText: prevState.requestCardInfo,
        swapReqModalVisible: false,
        hasCardDetails: true
    }))
  }

  cancelSwap = () => {
    this.setState(prevState => ({
        swapReqModalVisible: !prevState.swapReqModalVisible
    }))
  }

  acceptSwap = (cardInfo) => {
    this.setState({
        cardText: cardInfo,
        swapReqModalVisible: false,
        hasCardDetails: true
    })
  }

  render() {
    const userDict = this.state.userDict
    const title = this.state.cardText.title
    const color = this.state.cardText.color
    const imageSource = this.state.cardText.picture
    const description = this.state.cardText.description
    const cardSwap = this.state.cardText.cardSwap
    let userNameModalVisible = this.state.userNameModalVisible
    let swapReqModalVisible = this.state.swapReqModalVisible
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

    const lobbyViews = this.state.hasCardDetails ? showCardDetails : preLobbyView

    return (
      <View style={styles.lobbyView}>
        <UserNameModal
          isModalVisible={userNameModalVisible}
          onPress={this.userInGameLobby}
        />
        <SwapRequestModal
          isModalVisible={swapReqModalVisible}
          fromUser={this.state.requestCardUserName}
          onConfirm={this.swapCard}
          onCancel={this.cancelSwap}
        />
        {lobbyViews}
      </View>
    );
  }
}