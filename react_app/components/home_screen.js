import React from 'react';
import { Text, View, Image } from 'react-native';
import ScrollPicker from 'react-native-wheel-scroll-picker';

import BoomButton from '../utils/Button';
import { numberList } from '../utils/NeededConstants';
import { styles } from '../utils/StyleSheet';

export default class HomeScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            num_players: '1'
        }
    }
    onPickerSelect(data) {
        this.setState({
            num_players: data
        })
    }

    render () {
        let num_of_players = this.state.num_players
        return (
          <View style={styles.homeScreenContainer}>
            <Image
              source={require('../../boomboom/images/boom_boom_title.png')}
              style={styles.homeBanner}
              resizeMode='center'
            />
            <View style={{height: 280}}>
                <Text style={{margin: 10}}> Please Choose Number of Players:</Text>
                <ScrollPicker
                    dataSource={numberList}
                    selected_index={1}
                    renderItem={(data, index, isSelected) => {
                        //
                    }}
                    onValueChange={(data, selectedIndex) => this.onPickerSelect(data)}
                    wrapperHeight={160}
                    wrapperWidth={140}
                    wrapperBackground={'#FFFFFF'}
                    itemHeight={60}
                    highlightColor={'#d8d8d8'}
                    highlightBorderWidth={2}
                    activeItemColor={'#222121'}
                    itemColor={'#B4B4B4'}
                />
                <Text style={{margin: 20}}> You are playing with {num_of_players} players</Text>
            </View>
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
              onPress={() => {
                  this.props.navigation.navigate('GameLobby')
              }}
            />
          </View>
        );
    }
}