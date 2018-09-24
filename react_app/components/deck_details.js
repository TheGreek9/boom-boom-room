import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import SocketIOClient from 'socket.io-client';

import BoomButton from '../utils/Button';
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
      cardSet: []
    }
    this.socket = SocketIOClient(ngrok_game_server_site);
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
                  }`
    QueryGraphql(query).then(res => {
       const da_card = res.data.data;
        this.setState({
            cardDeck: da_card.cardSet,
            deckName: da_card.cardSet.name,
            cardSet: da_card.cardSet.cards
        });
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
        <BoomButton
              title="Choose This Deck/Start Game"
              style={{margin: 20}}
              onPress={this.sendCardData}
        />
      </View>
    );
  }
}