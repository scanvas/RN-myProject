import React, {Component} from 'react';
import {
    View, Text, StyleSheet, TextInput, TouchableOpacity, TouchableHighlight, Image, ListView
} from 'react-native';
import ScrollableTabView, { ScrollableTabBar, DefaultTabBar } from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/AntDesign';
import Voting from "./Questions/Voting";
import SegmentTabBar from "../component/segmentTabBar";
export default class MinePage extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            tabShow: false,
            label: ['推荐', '新品', '居家'],
            num:8,
            tabText:ds.cloneWithRows([
                {text:'邀请好友',iconName:'setting',path:'xxx'},
                {text:'我的优惠券',iconName:'setting',path:'ccc'},
                {text:'我的关注',iconName:'setting',path:'vvv'},
                {text:'我的粉丝',iconName:'setting',path:'bbb'},
            ])
        };
    }
    _tabTouch = ( path )=>{
        alert(path)
    }
    render() {
        return (
            <View style={{flex: 1}}>
                <View style={styles.container}>
                <View style={ styles.header }>
                    <View style={styles.headerIcon}>
                        <Icon onPress={ ()=>this.props.navigation.goBack()} style={ { lineHeight:40 } } name='setting' size={20} />
                    </View>
                    <Text style={{ color:'#000',fontSize:20,flex:1,textAlign:'center' }}>我的</Text>
                    <Icon  style={styles.quxiao} onPress={ ()=>this.props.navigation.goBack()} name='message1' size={20} />
                </View>
                <TouchableOpacity
                    onPress={()=>alert(1023)}
                    activeOpacity={0.5}>
                    <View style={{ height:80,backgroundColor:'#fff',flexDirection:'row', }}> 
                        <Image style={{height:80,width:80,borderRadius:40,borderWidth:1,borderColor:'red'}} source={require('../assets/images/qywx.png')}/>
                        <View style={{flex:1,height:80,justifyContent: 'center',paddingLeft:20}}>
                            <Text>13255555555</Text>
                            <Text>未认证</Text>
                        </View>
                        <Icon  style={ { lineHeight:80 } } name='right' size={20} />
                    </View>
               </TouchableOpacity>
               {/* <TouchableHighlight
                    onPress={()=>{}}
                    underlayColor='#E1F6FF'>
                    <Text style={{backgroundColor:'#fff'}} >React Native1111</Text>
               </TouchableHighlight> */}
                {/* <ScrollableTabView
                    initialPage={0}
                    renderTabBar={() => <ScrollableTabBar />}
                >
                    <Text tabLabel='Tab #1'>My</Text>
                    <Text tabLabel='Tab #2 '>favorite</Text>
                    <Text tabLabel='Tab #3 '>project</Text>
                </ScrollableTabView> */}
                <View>
                    <ListView
                    automaticallyAdjustContentInsets={false}
                    dataSource={this.state.tabText}
                    contentContainerStyle={{flexDirection:'row',backgroundColor:'#fff',marginBottom:0}}
                    renderRow={(rowData, sectionID, rowID, highlightRow) =>{ return (<View style={{flex:1,alignItems: 'center',}}> 
                        <Icon onPress={()=>{this._tabTouch(rowData.path)}} style={ { lineHeight:40 } } name={rowData.iconName} size={30} />
                        <Text  onPress={()=>{this._tabTouch(rowData.path)}}>{rowData.text}{ rowID }</Text>
                    </View>) }}
                    />
                </View>
                <Text style={{paddingLeft:20,fontSize:22,color:'#000',backgroundColor:'#fff',paddingTop:10,}}>我的专栏</Text>
                <ScrollableTabView
                    tabBarBackgroundColor='#fff'
                    tabBarActiveTextColor='#b4282d'
                    tabBarInactiveTextColor='#333'
                    tabBarUnderlineStyle={styles.tabBarUnderline}
                    initialPage={0}
                    renderTabBar={() => <SegmentTabBar/>}
                >
                    <Voting tabLabel={'提问'+ this.state.num}></Voting>
                    <Text tabLabel='回答'>favorite</Text>
                    <Text tabLabel='专讲'>project</Text>
                    <Text tabLabel='资料'>资料</Text>
                </ScrollableTabView>
                {/* <ScrollableTabView
                        renderTabBar={() => <DefaultTabBar style={{paddingLeft:20,paddingRight:20}} />}
                        tabBarBackgroundColor='#fff'
                        tabBarActiveTextColor='#b4282d'
                        tabBarInactiveTextColor='#333'
                        tabBarUnderlineStyle={styles.tabBarUnderline}
                    >
                        {
                            label.map((item, index) => {
                                if (item == '推荐') {
                                    return (
                                        <Recommend tabLabel={item} key={index}/>
                                    )
                                } else {
                                    return (
                                        <Text>{}</Text>
                                    )
                                }
                            })
                        }
                    </ScrollableTabView> */}
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
    header:{
        backgroundColor:'#ffffff',
        height:50,
        flexDirection:'row',
        justifyContent: 'space-around',
        alignItems:'center'
    },
    headerIcon:{
        height:40,
        lineHeight:40,
        marginLeft:10,
    },
    headerInput:{
        flex:1,
        height:40,
        padding:0,
        backgroundColor: '#f2f2f2',
        marginRight:5,
        paddingLeft:5,
    },
    quxiao:{
        lineHeight:40,
        paddingLeft: 10,
        marginRight: 10,
        color:'skyblue'
    },
    searchContent:{
        height:100,
        backgroundColor:'#fff',
    },
    tabBarUnderline: {
        backgroundColor: '#b4282d',
        height: 2,
    },
});