import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, Image, FlatList, ScrollView, SectionList } from 'react-native';
import { Button, Card } from 'react-native-elements';
import { createStackNavigator } from 'react-navigation';
import axios from 'axios';

import SocketIOClient from 'socket.io-client';

import { ngrok_game_server_site } from '../utils/needed_const';
import { MaterialHeaderButtons, hItem } from '../utils/HeaderButtons';
import CardDetails from './card_details'


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
        hasCardDetails: false
    }

    this.socket = SocketIOClient(ngrok_game_server_site);
    this.socket.emit('gameLobby', true)
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

  render() {
  const title = this.state.cardText.title
  const color = this.state.cardText.color
  const imageSource = this.state.cardText.picture
  const description = this.state.cardText.description
  const showCardDetails =
    <CardDetails
        title={title}
        color={color}
        imageSource={imageSource}
        description={description}
    />
  const preLobbyView = <View style={styles.lobbyView}>
                         <Text style={styles.lobbyText}>Please wait until the leader starts the game</Text>
                       </View>
  const test = this.state.hasCardDetails ? showCardDetails : preLobbyView
    return (
      test
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  image: {
    width: 200,
    height: 300,
    marginLeft: 70,
  },
  lobbyView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  lobbyText: {
    fontSize: 21,
    marginRight: 20,
    marginLeft: 20
  },
  card2: {
    backgroundColor: 'blue'
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});