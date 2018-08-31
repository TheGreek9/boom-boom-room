import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, Image, FlatList, ScrollView, SectionList } from 'react-native';
import { Card } from 'react-native-elements';
import BoomButton from '../utils/Button'
import { createStackNavigator } from 'react-navigation';
import axios from 'axios';

import { ngrok_django_site } from '../utils/needed_const';

export default class CardSetListScreen extends React.Component {

  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.state = {
      numberOfPlayers: navigation.getParam('num_of_players', '100'),
      isTextShowing: true,
      cardset_list: []
    }

  }

  changeCard = () => {
    this.setState(prevState => ({
      isTextShowing: !prevState.isTextShowing
    }));
  }

  componentDidMount() {
    let num = this.state.numberOfPlayers
    axios({
        url: `${ngrok_django_site}/graphql`,
        method: 'post',
        data: {
            query: `
                query {
                  playersCardSet(numOfPlayers:${num}) {
                    id
                    userId
                    name
                    numberOfPlayers
                  }
                }
            `
        }
    }).then(res => {
        this.setState({
            cardset_list: res.data.data.playersCardSet
        });
      }).catch(res => {
        const da_data = res;
        this.setState({cardset_list: da_data});
      })
  }

  render() {
    const cardset_name = "Decks"
    const cards_list = this.state.cardset_list
    const num_players = this.state.numberOfPlayers

    return (
      <View style={styles.container}>
      <Text style={styles.item}>Please Choose A Deck for {num_players} Players</Text>
        <SectionList
          sections={[
            {title: cardset_name, data: cards_list},
          ]}
          renderItem={({item}) =>
            <BoomButton
              title={item.name}
              onPress={() => {
                  this.props.navigation.navigate('DeckDetails', {
                    chosenDeckId: {item}
                  })
              }}
            />
          }
          renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
          keyExtractor={(item, index) => index}
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