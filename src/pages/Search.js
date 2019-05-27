import React, { Component } from 'react';
import {
    View, Text, StyleSheet, TextInput, Image, ScrollView, RefreshControl
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Button } from 'react-native-elements';
export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            hot:[
                {name:'职业健康',id:4465},
                {name:'消防',id:45645},
                {name:'化学品',id:456},
                {name:'电器安全',id:4565},
                {name:'防护装备',id:455},
                {name:'工伤事故',id:4},
            ]
        }
    }
    _hotSearch = ()=>{
        return this.state.hot.map(( value,index )=>{
            return (
                <Button 
                onPress={()=>{alert(index)}}
                buttonStyle={{backgroundColor:'#e1e1e1',marginRight:10,}}
                titleStyle={{color:'#000',fontSize:14,fontWeight:'0'}}
                title={ value.name }/>
            )
        })
    }
    _onRefresh = () => {
        var _this = this
        this.setState({ refreshing: true });
        setTimeout(function () {
            _this.setState({ refreshing: false });
        }, 1000);
    }

    _goList = (itemId, otherParam) => {
        this.props.navigation.navigate('List', {
            itemId: itemId,
            otherParam: otherParam,
        });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.headerIcon}>
                            <Icon style={{ lineHeight: 40 }} name='search1' size={20} />
                        </View>
                        <TextInput
                            underlineColorAndroid='transparent' //去掉默认下划线
                            placeholder='请输入搜索内容'
                            style={styles.headerInput}
                            onChangeText={(text) => { }}
                        ></TextInput>
                        <Text style={styles.quxiao} onPress={() => this.props.navigation.goBack()}>取消</Text>
                    </View>
                    <View style={styles.searchContent}>
                        {/*  ScrollView 默认撑满父容器高度*/}
                        <ScrollView style={{}}
                            alwaysBounceVertical={true}
                        // refreshControl={  //设置下拉刷新组件
                        //     <RefreshControl
                        //         refreshing={this.state.refreshing}
                        //         onRefresh={this._onRefresh}
                        //         tintColor='white'
                        //         title={this.state.isRefreshing ? '刷新中....' : '下拉刷新'}
                        //     />
                        // }
                        >
                            <Text>热门搜索</Text>
                            <View style={{ flexDirection: 'row', padding: 10, }}>
                                { this._hotSearch() }
                            </View>
                            <Text>历史记录</Text>
                            <View style={{ flexDirection: 'row', padding: 10, }}>
                                <Text style={styles.guanjianci} onPress={() => { this._goList(88, 'sssss') }}>电气</Text>
                                <Text style={styles.guanjianci}>工伤</Text>
                            </View>
                        </ScrollView>
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
        flexDirection: 'column',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    header: {
        backgroundColor: '#ffffff',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    headerIcon: {
        backgroundColor: '#f2f2f2',
        height: 40,
        lineHeight: 40,
        marginLeft: 10,
        paddingLeft: 5,
    },
    headerInput: {
        flex: 1,
        height: 40,
        padding: 0,
        backgroundColor: '#f2f2f2',
        marginRight: 5,
        paddingLeft: 5,
    },
    quxiao: {
        lineHeight: 40,
        paddingLeft: 10,
        paddingRight: 10,
        color: 'skyblue'
    },
    searchContent: {
        height: 500,
        backgroundColor: '#fff',
    },
    guanjianci: {
        width: 50,
        lineHeight: 30,
        marginRight: 16,
        backgroundColor: '#f2f2f2',
        textAlign: 'center'
    },

});