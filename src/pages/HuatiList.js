/** 
 * name: 话题列表页面
 * desc: 
 * */

import React, { Component } from 'react';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import SegmentTabBar from "../component/segmentTabBar";
import { BounceFlatList } from "react-native-bounce-flatlist";
import request from "../utils/request";
import {
    View, Text, StyleSheet,Image
} from 'react-native';
export default class HuatiList extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    _onFetch = (page, start, abort) => {
        console.log( 'page：', page )
        request.Http('topic/searchByCatagory', {
            catagory: 0,
            page,
            pageSize: 10
        }, 'post')
            .then(rep => {
                console.log(rep)
                start(rep.data.list)
            }).catch(err => {
                console.log(err)
            })
    }
    _renderItem = (item, index) => {
        return (<View style={{minHeight:100, backgroundColor: '#fff', marginTop:8 }}>
            <Text>{item.title}</Text>
            { item.imgUrls.length>0?(<View style={{ flexDirection:'row',justifyContent: 'flex-start',flexWrap:'wrap',marginTop:5 }}>
                {item.imgUrls.map((value,index)=>{
                    return <Image source={{ uri: value, width: 110, height: 110 }}></Image>
                })} 
            </View>):null }
        </View>);
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.container}>
                    <ScrollableTabView
                        tabBarBackgroundColor='#fff'
                        tabBarActiveTextColor='#b4282d'
                        tabBarInactiveTextColor='#333'
                        initialPage={0}
                        renderTabBar={() => <SegmentTabBar />}
                    >
                        <View tabLabel='全部' style={{ flex: 1, backgroundColor: '#f3eeee', }}>
                            <BounceFlatList
                                onDataFetch={this._onFetch}
                                customLoadingView={() => (<Text style={{ height: 70, backgroundColor: '#fff' }}>正在加载1</Text>)}
                                defaultEmptyDataDes={'没有数据哦~'}
                                renderItem={this._renderItem}
                                pageSize={10}
                            />
                        </View>
                        <Text tabLabel='已关注'>已关注</Text>
                        <Text tabLabel='投票中'>投票中</Text>
                    </ScrollableTabView>

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
        paddingLeft: 5,
    },
    headerInput: {
        flex: 1,
        height: 40,
        padding: 0,
        backgroundColor: '#f2f2f2',
        marginRight: 10,
        paddingLeft: 5,
    },
    quxiao: {
        paddingLeft: 10,
        paddingRight: 10,
    },
    searchContent: {
        height: 100,
        backgroundColor: '#fff',
    },
    guanjianci: {
        width: 50,
        lineHeight: 30,
        marginRight: 16,
        backgroundColor: '#f2f2f2',
        textAlign: 'center'
    },
    tabBar: {
        height: 60,
        backgroundColor: '#fff',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
    }

});