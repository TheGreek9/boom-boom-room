import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { Card, Divider } from 'react-native-elements';

import { MainButton, StyleButton } from '../utils/Button';
import { imagePaths } from '../utils/ImagePaths';
import { CardDescriptionModal } from '../utils/GameModals';

export default class BoomCard extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
        isModalVisible: false
    }
  }

  shutModal = () => {
    this.setState(prevState => ({
        isModalVisible: !this.state.isModalVisible
    }))
  }

  render(){
    return (
      <Card title={this.props.title}>
        <Image
            source={imagePaths[this.props.imageSource]}
            style={styles.image}
        />
        <Divider style={styles.divider}/>
        <MainButton
          title="Color Share"
          onPress={this.props.onPress}
        />
        <StyleButton
          title="Description"
          onPress={this.shutModal}
          style={{height: 50, width: 150, marginLeft: 60, backgroundColor: '#5b6870'}}
          titleStyle={{fontSize: 2}}
        />
        <CardDescriptionModal
          onPress={this.shutModal}
          isModalVisible={this.state.isModalVisible}
          cardTitle={this.props.title}
          description={this.props.description}
        />
      </Card>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 300,
    marginLeft: 50,
    marginRight: 50
  },
  divider: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: 'grey'
  }
});
