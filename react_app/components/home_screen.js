import React from 'react';
import { Text, View, Image } from 'react-native';

import BoomButton from '../utils/Button';
import Scroller from '../utils/Scroller'
import { styles } from '../utils/StyleSheet';
import GameModal from '../utils/GameModal';

export default class HomeScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            num_players: '1',
            isModalVisible: false
        }
    }

    onPickerSelect = (data) => {
        this.setState({
            num_players: data
        })
    }

    showHideModal = () => {
        this.setState(prevState => ({
            isModalVisible: !this.state.isModalVisible
        }))
    }

    toGameLobby = () => {
      this.setState(prevState => ({
        isModalVisible: !this.state.isModalVisible
      }))
      this.props.navigation.navigate('GameLobby')
    }

    render () {
        let num_of_players = this.state.num_players
        let tester = this.state.isModalVisible
        return (
          <View style={styles.homeScreenContainer}>
            <Image
              source={require('../../boomboom/images/boom_boom_title.png')}
              style={styles.homeBanner}
              resizeMode='center'
            />
            <View style={{height: 280}}>
                <Text style={{margin: 10}}> Please Choose Number of Players:</Text>
                <Scroller
                    onValueChange={(data, selectedIndex) => this.onPickerSelect(data)}
                />
                <Text style={{margin: 20}}> You are playing with {num_of_players} players</Text>
            </View>
            <GameModal isModalVisible={tester} onPress={this.toGameLobby}/>
            <BoomButton
              title="Choose Deck"
              onPress={() => {
                  this.props.navigation.navigate('CardSetList', {
                    num_of_players: num_of_players
                  })
              }}
            />
            <BoomButton
              title="Join Game"
              onPress={this.showHideModal}
            />
          </View>
        );
    }
}