import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, Image, FlatList, ScrollView, SectionList } from 'react-native';
import { Button, Card } from 'react-native-elements';
import ScrollPicker from 'react-native-wheel-scroll-picker';

import { numberList } from '../utils/needed_const';
import DeckDetailsScreen from './deck_details';

export default class HomeScreen extends Component {
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
          <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around' }}>
            <Text style={styles.title}>Welcome to Two Rooms and A Boom</Text>
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
            <Button
              title="Choose Deck"
              onPress={() => {
                  this.props.navigation.navigate('CardSetList', {
                    num_of_players: num_of_players
                  })
              }}
            />
            <Button
              title="Join Game"
              style={{margin: 20}}
              onPress={() => {
                  this.props.navigation.navigate('GameLobby')
              }}
            />
          </View>
        );
    }
}


const styles = StyleSheet.create({
  title: {
    margin: 10,
    fontSize: 20,
    textAlign: 'center'


  }
});