import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import SocketIOClient from 'socket.io-client';

import { MainButton } from '../utils/Button';
import { ngrok_game_server_site } from '../utils/EnvironmentVars';
import { MaterialHeaderButtons, hItem } from '../utils/HeaderButtons';
import { imagePaths } from '../utils/ImagePaths';
import { QueryGraphql } from '../utils/GraphqlQuery';
import { styles } from '../utils/StyleSheet';

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
      nonBuriedCards: [],
      buriedCards: []
    }
    this.socket = SocketIOClient(ngrok_game_server_site);
    this.socket.on('confirmDataReceived', this.confirmedDataReceived)
  }

  componentDidMount() {
    this.props.navigation.setParams({ discBack: this.discBack})
    let deckId = this.state.deckId
    let query = `cardSet(id:${deckId}){
                    id
                    userId
                    name
                    numberOfPlayers
                    cards {
                      id
                      title
                      description
                      color
                      picture
                      cardSwap
                    }
                    buriedCards {
                      id
                      title
                      description
                      color
                      picture
                      cardSwap
                    }
                  }`
    QueryGraphql(query).then(res => {
       const da_card = res.data.data;
        this.setState({
            cardDeck: da_card.cardSet,
            deckName: da_card.cardSet.name,
            nonBuriedCards: da_card.cardSet.cards,
            buriedCards: da_card.cardSet.buriedCards
        });
    })
  }

  discBack = () => {
    this.socket.disconnect();
    this.props.navigation.goBack();
  }

  sendCardData = () => {
    this.socket.emit('deckData', this.state.cardDeck);
  }

  confirmedDataReceived = () => {
    this.socket.disconnect();
    this.props.navigation.navigate('GameLobby');
  }

  render() {
    const nonBuriedCards = this.state.nonBuriedCards
    const buriedCards = this.state.buriedCards
    const cardSet = nonBuriedCards.concat(buriedCards)
    const deckName = this.state.deckName
    return (
      <View style={styles.listContainer}>
      <Text>Cards in Chosen Deck:</Text>
      <ScrollView>
        <List>
          {
            cardSet.map((item) => (
              <ListItem
                roundAvatar
                hideChevron
                avatar={imagePaths[item.picture]}
                key={item.id}
                title={item.title}
              />
            ))
          }
        </List>
      </ScrollView>
        <MainButton
              title="Choose This Deck/Start Game"
              style={{margin: 20}}
              onPress={this.sendCardData}
        />
      </View>
    );
  }
}