import React, {Component} from 'react';
import {
    View, Text, StyleSheet, TextInput,Button, Image, ScrollView, RefreshControl
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
export default class List extends Component {
    constructor(props){
        super(props);
        this.state={
            refreshing: false,
        }
    }
    render() {
        return (
            <View style={{flex: 1}}>
                <View style={styles.container}>
                    <View style={ styles.header }>
                        <Text style={styles.quxiao} onPress={()=>this.props.navigation.goBack()}><Icon name='left' size={25}></Icon></Text>
                        <View style={styles.headerIcon}>
                            <Icon style={ { lineHeight:40 } } name='search1' size={20} />
                        </View>
                        <TextInput
                        underlineColorAndroid='transparent' //去掉默认下划线
                        placeholder='请输入搜索内容'
                        style={styles.headerInput}
                        onChangeText={(text) => {}}
                        ></TextInput>
                    </View>
                    <View style={ styles.tabBar }>

                    </View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        flexDirection:'column',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    header:{
        backgroundColor:'#ffffff',
        height:50,
        flexDirection:'row',
        justifyContent: 'space-around',
        alignItems:'center'
    },
    headerIcon:{
        backgroundColor: '#f2f2f2',
        height:40,
        lineHeight:40,
        paddingLeft:5,
    },
    headerInput:{
        flex:1,
        height:40,
        padding:0,
        backgroundColor: '#f2f2f2',
        marginRight:10,
        paddingLeft:5,
    },
    quxiao:{
        paddingLeft: 10,
        paddingRight: 10,
    },
    searchContent:{
        height:100,
        backgroundColor:'#fff',
    },
    guanjianci:{
        width:50,
        lineHeight:30,
        marginRight:16,
        backgroundColor:'#f2f2f2',
        textAlign:'center'
    },
    tabBar:{
        height:60,
        backgroundColor:'#fff',
        flexDirection:'row',
        borderBottomWidth:1,
        borderBottomColor:'#f2f2f2',
    }

});