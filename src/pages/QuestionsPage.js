import React, {Component} from 'react';
import {
    View, Text, StyleSheet, ScrollView
} from 'react-native';
import screen from '../utils/screen';
// import {SmartRefreshControl,DefaultHeader} from 'react-native-smartrefreshlayout';
import {BounceFlatList} from "react-native-bounce-flatlist";
const fakeData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const fakeData1 = [10, 20, 30, 40, 50, 6, 7, 8, 9, 10];
const fakeData2 = [100, 200, 300, 400, 500, 6, 7, 8, 9, 10];
export default class QuestionsPage extends Component {
    constructor( props ){
        super(props);
        this.state = {
            tabList:[
                { name:'全部' },
                { name:'已关注' },
                { name:'投票中' },
            ],
            nowPage:0
        }
    }
    _tabPage = (key)=>{
        this.setState({
            ...this.state,
            nowPage:key
        })
    }
    _onFetch1 = (page, start, abort) => {
        setTimeout(() => {
            start(fakeData);
        }, 2000);
    }
    _onFetch2 = (page, start, abort) => {
        setTimeout(() => {
            start(fakeData1);
        }, 2000);
    }
    _onFetch3 = (page, start, abort) => {
        setTimeout(() => {
            start(fakeData2);
        }, 2000);
    }
    _renderItem = (item, index) => {
        return (<Text style={{height: 70,backgroundColor:'#fff'}}>{item}</Text>);
    }
    render() {
        return (
            <View style={{flex: 1}}>
                <View style={styles.container}>
                    <View style={ styles.tabBar }>
                        { this.state.tabList.map((value,key)=>{
                           return (<View style={ styles.tabItem } key={key}>
                               <Text
                                style={{lineHeight:60,color:(key == this.state.nowPage)?'red':'#333',}}
                                onPress={ ()=>{ this._tabPage(key) } } >{ value.name }</Text>
                           </View>)
                        }) }
                    </View>
                    {/* <View style={styles.list}>
                        {  this.state.nowPage == 0 ? <BounceFlatList
                            onDataFetch={this._onFetch}
                            customLoadingView={()=>(<Text style={{height: 70,backgroundColor:'#fff'}}>正在加载1</Text>)}
                            defaultEmptyDataDes={'没有数据哦~'}
                            renderItem={this._renderItem}
                            pageSize={4}
                        />:null  }
                        {  this.state.nowPage == 1 ? <BounceFlatList
                            onDataFetch={this._onFetch}
                            customLoadingView={()=>(<Text style={{height: 70,backgroundColor:'#fff'}}>正在加载2</Text>)}
                            defaultEmptyDataDes={'没有数据哦~'}
                            renderItem={this._renderItem}
                            pageSize={4}
                        />:null  }
                        {  this.state.nowPage == 2 ? <BounceFlatList
                            onDataFetch={this._onFetch}
                            customLoadingView={()=>(<Text style={{height: 70,backgroundColor:'#fff'}}>正在加载3</Text>)}
                            defaultEmptyDataDes={'没有数据哦~'}
                            renderItem={this._renderItem}
                            pageSize={4}
                        />:null  }
                    </View> */}
                    <View style={{ flex:1,
        backgroundColor:'pink',display:( this.state.nowPage == 0  )?'flex':'none' }}>
                        <BounceFlatList
                            onDataFetch={this._onFetch1}
                            customLoadingView={()=>(<Text style={{height: 70,backgroundColor:'#fff'}}>正在加载1</Text>)}
                            defaultEmptyDataDes={'没有数据哦~'}
                            renderItem={this._renderItem}
                            pageSize={4}
                        />
                    </View>
                    <View style={{ flex:1,
        backgroundColor:'pink',display:( this.state.nowPage == 1  )?'flex':'none' }}>
                        <BounceFlatList
                            onDataFetch={this._onFetch2}
                            customLoadingView={()=>(<Text style={{height: 70,backgroundColor:'#fff'}}>正在加载2</Text>)}
                            defaultEmptyDataDes={'没有数据哦~'}
                            renderItem={this._renderItem}
                            pageSize={4}
                        />
                    </View>
                    <View  style={{ flex:1,
        backgroundColor:'pink',display:( this.state.nowPage == 2  )?'flex':'none' }}>
                        <BounceFlatList
                            onDataFetch={this._onFetch3}
                            customLoadingView={()=>(<Text style={{height: 70,backgroundColor:'#fff'}}>正在加载3</Text>)}
                            defaultEmptyDataDes={'没有数据哦~'}
                            renderItem={this._renderItem}
                            pageSize={4}
                        />
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
    },
    tabBar:{
        height:60,
        backgroundColor:'#fff',
        borderBottomWidth:1,
        borderBottomColor:'#333',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        zIndex:1000
    },
    tabItem:{
        width:60,
        lineHeight:60,
    },
    list:{
        flex:1,
        backgroundColor:'pink',
    }
});