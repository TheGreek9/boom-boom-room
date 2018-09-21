import React from 'react';
import { View } from 'react-native';

import BoomCard from '../utils/Card';
import { styles } from '../utils/StyleSheet';

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
          <View style={styles.cardContainer}>
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
