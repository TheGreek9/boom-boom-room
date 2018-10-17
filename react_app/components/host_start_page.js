import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements'
import SocketIOClient from 'socket.io-client';

import { MainButton } from '../utils/Button';
import Scroller from '../utils/Scroller'
import { styles } from '../utils/StyleSheet';
import { ngrok_game_server_site } from '../utils/EnvironmentVars';
import { ResetServerModal } from '../utils/GameModals';


export default class HostPageScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            num_players: '1',
            resetServerModalVisible: false
        }
        this.socket = SocketIOClient(ngrok_game_server_site)
    }

    onPickerSelect = (data) => {
        this.setState({
            num_players: data
        })
    }

    showResetServerModal = () => {
    this.setState(prevState => ({
      resetServerModalVisible: !prevState.resetServerModalVisible
    }))
  }

  sendDisconnectAll = () => {
    this.socket.emit('disconnectAll', true)
    this.setState(prevState => ({
      resetServerModalVisible: false
    }))
  }

    render () {
        let num_of_players = this.state.num_players
        let modalVisible = this.state.resetServerModalVisible
        return (
          <View style={styles.hostScreenContainer}>
            <Image
              source={require('../utils/images/boom_boom_title.png')}
              style={styles.homeBanner}
              resizeMode='center'
            />
            <View style={{marginTop: 30}}>
                <Text> Please Choose Number of Players:</Text>
                <View style={{height: 200, marginTop: 30, marginBottom: 10}}>
                  <Scroller
                      onValueChange={(data, selectedIndex) => this.onPickerSelect(data)}
                  />
                </View>
                <Text style={{margin: 20}}> You are playing with {num_of_players} players</Text>
            </View>
            <View style={daaa_styles.swapContainer}>
              <View >
                <Icon
                  raised
                  name='cloud-off'
                  onPress={this.showResetServerModal}
                />
              </View>
              <View >
                <MainButton
                  title="Choose Deck"
                  onPress={() => {
                      this.props.navigation.navigate('CardSetList', {
                        num_of_players: num_of_players
                      })
                  }}
                />
              </View>
            </View>
            <ResetServerModal
              isModalVisible={modalVisible}
              onConfirm={this.sendDisconnectAll}
              onCancel={this.showResetServerModal}
            />
          </View>
        );
    }
}

const daaa_styles = StyleSheet.create({
  swapContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  swapButtonContainer: {
    flex: 1,
  },

});