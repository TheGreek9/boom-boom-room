import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, Image, FlatList, ScrollView, SectionList } from 'react-native';
import { Card, List, ListItem } from 'react-native-elements';
import BoomButton from '../utils/Button'
import { createStackNavigator } from 'react-navigation';
import axios from 'axios';

import SocketIOClient from 'socket.io-client';

import { ngrok_django_site, ngrok_game_server_site } from '../utils/needed_const';
import { MaterialHeaderButtons, hItem } from '../utils/HeaderButtons';


export default class DeckDetailsScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <MaterialHeaderButtons>
          <hItem title="add" iconName="arrow-back" onPress={navigation.getParam('discBack')} />
        </MaterialHeaderButtons>
      ),
    };
  };

  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.state = {
      deckId: navigation.getParam('chosenDeckId', 'details not working').item.id,
      cardSet: []
    }
    this.socket = SocketIOClient(ngrok_game_server_site);
  }

  componentDidMount() {
    this.props.navigation.setParams({ discBack: this.discBack})

    let deckId = this.state.deckId
    axios({
        url: `${ngrok_django_site}/graphql`,
        method: 'post',
        data: {
            query: `
                query {
                  cardSet(id:${deckId}){
                    id
                    userId
                    name
                    numberOfPlayers
                    cards {
                      id
                      title
                      description
                      color
                    }
                  }
                }
            `
        }
    }).then(res => {
        const da_card = res.data.data;
        this.setState({
            cardDeck: da_card.cardSet,
            deckName: da_card.cardSet.name,
            cardSet: da_card.cardSet.cards
        });
      }).catch(res => {
        const da_data = res;
        this.setState({card: da_data});
      })
  }

  discBack = () => {
    this.socket.disconnect();
    this.props.navigation.goBack();
  }

  sendCardData = () => {
    this.socket.emit('deckData', this.state.cardDeck);
    this.socket.disconnect();
    this.props.navigation.navigate('GameLobby');
  }

  render() {
    const cardSet = this.state.cardSet
    const deckName = this.state.deckName
    return (
      <View style={styles.container}>
      <Text>Cards in Chosen Deck:</Text>
      <ScrollView>
        <List>
          {
            cardSet.map((item) => (
              <ListItem
                roundAvatar
                hideChevron
                avatar={require('../../boomboom/images/boom_boom_title.png')}
                key={item.id}
                title={item.title}
              />
            ))
          }
        </List>
      </ScrollView>
        <BoomButton
              title="Choose This Deck/Start Game"
              style={{margin: 20}}
              onPress={this.sendCardData}
        />
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