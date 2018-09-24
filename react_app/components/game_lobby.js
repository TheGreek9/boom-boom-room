import React from 'react';
import { Text, View } from 'react-native';
import SocketIOClient from 'socket.io-client';

import { ngrok_game_server_site } from '../utils/EnvironmentVars';
import { MaterialHeaderButtons, hItem } from '../utils/HeaderButtons';
import CardDetails from './card_details';
import { styles } from '../utils/StyleSheet';
import GameModal from '../utils/GameModal';


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
        isModalVisible: true
    }

    this.socket = SocketIOClient(ngrok_game_server_site)
    this.socket.on('gameServer', this.setData)
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
      cardText: text,
      hasCardDetails: true
    }));
  }

  toGameLobby = (userName) => {
    this.setState(prevState => ({
      isModalVisible: !this.state.isModalVisible
    }))
    this.socket.emit('gameLobby', userName)
  }

  render() {
  const daCardText = this.state.cardText
  const title = this.state.cardText.title
  const color = this.state.cardText.color
  const imageSource = this.state.cardText.picture
  const description = this.state.cardText.description
  let tester = this.state.isModalVisible
  const showCardDetails =
    <CardDetails
        title={title}
        color={color}
        imageSource={imageSource}
        description={description}
    />
  const preLobbyView =
    <View style={styles.lobbyView}>
      <Text style={styles.lobbyText}>
        Please wait until the leader starts the game
      </Text>
      <GameModal isModalVisible={tester} onPress={this.toGameLobby}/>
    </View>
  const test = this.state.hasCardDetails ? showCardDetails : preLobbyView
    return (
      <Text>{JSON.stringify(daCardText)}</Text>
    );
  }
}