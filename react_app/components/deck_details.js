import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, Image, FlatList, ScrollView, SectionList } from 'react-native';
import { Button, Card } from 'react-native-elements';
import { createStackNavigator } from 'react-navigation';
import axios from 'axios';

import SocketIOClient from 'socket.io-client';

import { local_ngrok_site, ngrok_server_site } from '../utils/needed_const';
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
    this.socket = SocketIOClient(ngrok_server_site);
  }

  componentDidMount() {
    this.props.navigation.setParams({ discBack: this.discBack})

    let deckId = this.state.deckId
    axios({
        url: `${local_ngrok_site}/graphql`,
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
    this.socket.emit('deck-data', this.state.cardDeck);
    this.socket.disconnect();
    this.props.navigation.navigate('GameLobby');
  }

  render() {
    const cardSet = this.state.cardSet
    const deckName = this.state.deckName
    return (
      <View style={styles.container}>
        <SectionList
          sections={[
            {title: deckName, data: cardSet},
          ]}
          renderItem={({item}) => <Text> {item.title} </Text>}
          renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
          keyExtractor={(item, index) => index}
        />
        <Button
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