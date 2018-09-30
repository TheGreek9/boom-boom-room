import React from 'react';
import ScrollPicker from 'react-native-wheel-scroll-picker';

import { numberList } from '../utils/Miscellaneous';

export default class Scroller extends React.Component{
    render(){
        const { onValueChange } = this.props
        return (
            <ScrollPicker
                dataSource={numberList}
                selected_index={1}
                renderItem={(data, index, isSelected) => {
                    //
                }}
                onValueChange={onValueChange}
                wrapperHeight={160}
                wrapperWidth={140}
                wrapperBackground={'#FFFFFF'}
                itemHeight={60}
                highlightColor={'#d8d8d8'}
                highlightBorderWidth={2}
                activeItemColor={'#222121'}
                itemColor={'#B4B4B4'}
            />
        )
    }
}