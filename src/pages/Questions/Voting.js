import React, {Component} from 'react';
import {BounceFlatList} from "react-native-bounce-flatlist";
import {
    View, Text, StyleSheet,ScrollView
} from 'react-native';
const fakeData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
export default class Voting extends Component {
    _onFetch = (page, start, abort) => {
        setTimeout(() => {
            start(fakeData);
        }, 1000);
    }
    _renderItem = (item, index) => {
        return (<Text style={{height: 70,backgroundColor:'#fff'}}>{item}</Text>);
    }
    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{ flex:1,backgroundColor:'pink',}}>
                        <BounceFlatList
                            onDataFetch={this._onFetch}
                            customLoadingView={()=>(<Text style={{height: 70,backgroundColor:'#fff'}}>正在加载1</Text>)}
                            defaultEmptyDataDes={'没有数据哦~'}
                            renderItem={this._renderItem}
                            pageSize={4}
                        />
                    </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
});