import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, Image } from 'react-native';
import { Card, Divider } from 'react-native-elements';
import BoomButton from '../utils/Button'
import BoomCard from '../utils/Card'
import { createStackNavigator } from 'react-navigation';

export default class CardDetails extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            cardFlipBool: true,
            title: this.props.title,
            color: this.props.color,
            description: this.props.description
        }
    }

    changeCard = () => {
        this.setState(prevState => ({
          cardFlipBool: !prevState.cardFlipBool
        }));
    }

    render() {
        let textShow = this.state.cardFlipBool;
        let color = this.state.color;
        let display;
        let title;
        let description;
        let imageSource;

        if (textShow) {
          imageSource = this.props.imageSource
          title=this.state.title
          description = this.state.description
        } else {
          imageSource = color
          title=`${color} Team`
          description = `You are on the ${color} Team`
        }

        return (
          <View style={styles.container}>
            <BoomCard
              onPress={this.changeCard}
              title={title}
              description={description}
              imageSource={imageSource}
            />
          </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: 250,
    height: 350,
    marginLeft: 20,
    marginRight: 20
  },
  card2: {
    backgroundColor: 'blue',
    width: 300,
    height: 400,
  },
  divider: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: 'grey'
  }
});
