import React from 'react';
import { Text, View } from 'react-native';
import { List, ListItem } from 'react-native-elements';

import { QueryGraphql } from '../utils/GraphqlQuery';
import { styles } from '../utils/StyleSheet';

export default class CardSetListScreen extends React.Component {

  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.state = {
      numberOfPlayers: navigation.getParam('num_of_players', '0'),
      cardset_list: []
    }

  }

  componentDidMount() {
    let num = this.state.numberOfPlayers
    let query = `playersCardSet(numOfPlayers:${num}) {
                    id
                    userId
                    name
                    numberOfPlayers
                  }`
    QueryGraphql(query).then(res => {
       this.setState({
        cardset_list: res.data.data.playersCardSet
       });
    })
  }

  render() {
    const cardset_name = "Decks"
    const cards_list = this.state.cardset_list
    const num_players = this.state.numberOfPlayers

    return (
      <View style={styles.listContainer}>
        <Text style={styles.titleText}>Please Choose A Deck for {num_players} Players</Text>
        <List>
          {
            cards_list.map((item) => (
              <ListItem
                key={item.id}
                title={item.name}
                onPress={() => {
                  this.props.navigation.navigate('DeckDetails', {
                    chosenDeckId: {item}
                  })
              }}
              />
            ))
          }
        </List>
      </View>
    );
  }
}