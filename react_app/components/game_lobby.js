import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, Image, FlatList, ScrollView, SectionList } from 'react-native';
import { Button, Card } from 'react-native-elements';
import { createStackNavigator } from 'react-navigation';
import axios from 'axios';

import SocketIOClient from 'socket.io-client';

import { local_ngrok_site, ngrok_server_site } from '../utils/needed_const';
import { MaterialHeaderButtons, hItem } from '../utils/HeaderButtons';


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
        cardText: 'nothing as of yet'
    }

    this.socket = SocketIOClient(ngrok_server_site);
    this.socket.on('gameServer', this.setData)
  }

  componentDidMount() {
    this.props.navigation.setParams({ discIt: this.discIt})
  }

  discIt = () => {
    this.socket.disconnect();
    this.props.navigation.goBack();
  }

  setData = (text) => {
    this.setState(prevState => ({
      cardText: text
    }));
  }

  render() {
  const daText = this.state.cardText
    return (
      <View style={styles.container}>
        <Text>{JSON.stringify(daText)}</Text>
      </View>
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