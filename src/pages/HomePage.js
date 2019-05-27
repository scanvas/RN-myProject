import React, { Component } from 'react';
import {
    View, Text, StyleSheet, FlatList, TextInput, ScrollView, RefreshControl, Image, TouchableOpacity, Linking, ToastAndroid, Platform
} from 'react-native';
import { screenW } from '../utils/screen';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import RNFS from 'react-native-fs';
import OpenFile from 'react-native-doc-viewer';
import ImagePicker from 'react-native-image-crop-picker';
import request from "../utils/request";
const qiniu = require('react-native-qiniu');
const ExternalDirectoryPath = Platform.OS === 'ios'
    ? RNFS.DocumentDirectoryPath
    : 'file://' + RNFS.ExternalDirectoryPath;

function guid() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + "_" + S4() + "_" + S4() + "_" + S4() + "_" + S4() + S4() + S4());
}
export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            currentPage: 1,
            lastPage: 10,
            list: [
                { name: 'IG', number: 1, person: 10 },
                { name: 'RNG', number: 2, person: 10 },
                { name: 'EDG', number: 3, person: 10 },
                { name: 'WE', number: 4, person: 10 },
                { name: 'LGD', number: 5, person: 10 },
            ],
            fileUrl: null,
            upImageUrl: null,
            imgUrlOnline:null
        }
    }
    _upImage = () => {
        ImagePicker.openPicker({
            mediaType: 'photo',
        }).then(image => {
            console.log(image)
            this.setState({
                upImageUrl: image.path
            })
            request.PostAxios('http://admin.cloud.baishapu.com/api/common/qiniu/getTokenByProduct', {})
                .then(rep => {
                    console.log(rep)
                    //  UploadImage({
                    //     token: rep.body.token,
                    //     vido: rep.body.vido,
                    //     url: rep.body.url,
                    //     file: image
                    //   })
                        let url=rep.body.url
                        let name = guid();
                        console.log( name )
                       let adc =  qiniu.Rpc.uploadFile(image.path,rep.body.token,{
                            key:name
                        }).then(rep2=>{
                            console.log( url+name )
                            this.setState({
                                imgUrlOnline:url+name
                            })
                            //
                            console.log('上传成功')
                        })
                        console.log( typeof adc )
                    // Rpc.uploadFile(image.path,rep.body.token,{key:'so1'}, (success) => { console.log(success) },
                    //     (failure) => { console.log(failure) }, (progress) => { console.log(progress) });
                }).catch(err => {
                    console.log(err)
                })
        });
    }
    _onPressOpenFile = (path) => {
        if (!this.state.fileUrl) {
            ToastAndroid.showWithGravity('文件未下载', ToastAndroid.SHORT, ToastAndroid.CENTER);
            return
        }
        // const FilePath = path;
        // const urlLast = FilePath.lastIndexOf(".");
        // const urlType = FilePath.substr(urlLast + 1);
        // const FileMimeType = (urlType === ('jpg' || 'jpeg' || 'png'))
        //     ? 'image'
        //     : 'application/msword';
        // FileOpener.open(FilePath, FileMimeType).then((msg) => {
        //     alert( msg )
        // }, (e) => {
        //     alert('error!!', e)
        // });
        if (Platform.OS === 'ios') {
            OpenFile.openDoc([{
                url: this.state.fileUrl,
                fileNameOptional: "test filename"
            }], (error, url) => {
                if (error) {
                    alert(error)
                } else {
                    alert('dakail')
                }
            })
        } else {
            const urlLast = this.state.fileUrl.lastIndexOf(".");
            const urlType = this.state.fileUrl.substr(urlLast + 1);
            alert(urlType)
            OpenFile.openDoc([{
                url: this.state.fileUrl,
                fileName: "sample",
                cache: false,
                fileType: urlType
            }], (error, url) => {
                if (error) {
                    alert(error)
                } else {
                    alert('dakail')
                }
            })

        }
    }


    _download = () => {
        let _this = this
        if (this.state.fileUrl) {
            ToastAndroid.showWithGravity('文件已经存在', ToastAndroid.SHORT, ToastAndroid.CENTER);
            return
        }
        //设置下载参数
        const options = {
            fromUrl: 'https://productimage.baishapu.com/公司导出201905221125450716.xls',
            toFile: `${ExternalDirectoryPath}/公司导出201905221125450716.xls`,
            background: true,
            progressDivider: 5,
            begin: (res) => {
                //开始下载时回调
                ToastAndroid.showWithGravity('开始下载', ToastAndroid.SHORT, ToastAndroid.CENTER);
            },
            progress: (res) => {
                //下载过程中回调，根据options中设置progressDivider:5，则在完成5%，10%，15%，...，100%时分别回调一次，共回调20次。
                console.log('progress', res)
            }
        }
        try {
            const ret = RNFS.downloadFile(options);
            ret.promise.then(res => {
                this.setState({
                    fileUrl: `${ExternalDirectoryPath}/公司导出201905221125450716.xls`
                })
                alert(this.state.fileUrl)
                ToastAndroid.showWithGravity('下载成功', ToastAndroid.SHORT, ToastAndroid.CENTER);
            }).catch(err => {
                ToastAndroid.showWithGravity('下载失败', ToastAndroid.SHORT, ToastAndroid.CENTER);
            });
        }
        catch (e) {
            ToastAndroid.showWithGravity('下载失败', ToastAndroid.SHORT, ToastAndroid.CENTER);
        }

    }
    _keyExtractor = (item, index) => index.toString();
    _onScroll = (event) => {
        // if(this.state.loadMore){
        //     return;
        // }
        let Y = event.nativeEvent.contentOffset.y;
        // let height = event.nativeEvent.layoutMeasurement.height;
        // let contentHeight = event.nativeEvent.contentSize.height;
        // console.log('offsetY-->' + y);
        // console.log('height-->' + height);
        // console.log('contentHeight-->' + contentHeight);

        if (Y < 100) {
            st = Y * 0.01;
        } else {
            st = 1;
        }
        this.refs.search.setNativeProps({
            backgroundColor: 'rgba(178,178,178,' + st + ')'
        })
    }
    _openURL = ( url ) => {
        // 会打开手机浏览器
        // let url = 'http://www.baidu.com';
        if( !url ) url='http://www.baidu.com'
        Linking.openURL(url)
    }
    render() {
        return (
            <View style={styles.container}>
                {/* <TextInput
                style={styles.search}
                onPress={()=>alert(123)}
                inputStyle={{color: 'black', fontSize: 14}}
                placeholder='客官，需要什么？'
                placeholderTextColor='#aaa'
                onChangeText={()=>{}}
            /> */}
                {/* <Text>Home!</Text>
                <View style={styles.container}>
                    <FlatList
                        data={this.state.list}
                        onRefresh = {this._onRefresh.bind(this)} //下拉刷新操作
                        keyExtractor = {this._keyExtractor} // 循环制定唯一的key,类型字符串，不事字符串有警告
    　　                refreshing = {this.state.refreshing} //等待加载出现加载的符号是否显示
                        onEndReachedThreshold = {0.5} //当距离内容比例不足内容0.1比例时触发onEndReached
                        onEndReached = {this._endReached.bind(this)} //上拉加载数据
                        //隐藏水平
                        showsHorizontalScrollIndicator = {false}
                        //隐藏垂直
                        showsVerticalScrollIndicator = {false}
                        renderItem={({item,index}) => <Text style={styles.item} onPress={()=>this._onPressItem(item.name)}>{item.name} { index }</Text>}
                    />
                </View> */}

                <ScrollView
                    style={{}}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
                            tintColor="#ff0000"
                            title="加载中..."
                            titleColor="#00ff00"
                            colors={['#ff0000', '#00ff00', '#0000ff']}
                            progressBackgroundColor="#ffffff"
                        />
                    }
                    onScroll={this._onScroll.bind(this)}
                    scrollEventThrottle={10}
                    // onMomentumScrollBegin={()=>{ alert('onMomentumScrollBegin') }}
                    // onScrollBeginDrag={()=>{alert('onScrollBeginDrag')}}
                    //隐藏水平
                    showsHorizontalScrollIndicator={false}
                    //隐藏垂直
                    showsVerticalScrollIndicator={false}
                >
                    <View style={{ height: 300, backgroundColor: 'yellow' }}>
                        <Swiper
                            style={styles.swiper}
                            height={300}
                            autoplay={true}
                            autoplayTimeout={3}
                            horizontal={true}
                            paginationStyle={{ bottom: 10 }}
                            showsButtons={false}>
                            <View style={{ backgroundColor: 'pink', height: 300 }}>
                                <TouchableOpacity activeOpacity={1} onPress={() => this._openURL('http://www.baidu.com')}>
                                    <Image style={{ width: screenW.width, height: 300 }} source={{ uri: 'https://facebook.github.io/react/logo-og.png' }}></Image>
                                </TouchableOpacity>
                            </View>
                            <View style={{ backgroundColor: 'blue', height: 300 }}>
                                <TouchableOpacity activeOpacity={1} onPress={() => { this._onPressItem() }}>
                                    <Image style={{ width: screenW.width, height: 300 }} source={{ uri: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2896884055,3311350026&fm=26&gp=0.jpg' }}></Image>
                                </TouchableOpacity>
                            </View>
                            <View style={{ backgroundColor: 'red', height: 300 }}>
                                <TouchableOpacity activeOpacity={1} onPress={() => alert(3)}>
                                    <Image style={{ width: screenW.width, height: 300 }} source={{ uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558925684&di=529fea2f1b1c24de9769e3220b919a5c&imgtype=jpg&er=1&src=http%3A%2F%2Fwww.ali213.net%2Fpicfile%2FNews%2F2011%2F03%2F31%2Fj50jpg.jpg' }}></Image>
                                </TouchableOpacity>
                            </View>
                        </Swiper>
                    </View>
                    <View style={{ height: 100, flexDirection: 'row', justifyContent: 'center' }}>
                        <View style={{ width: screenW / 4, justifyContent: 'center' }}>
                            <Icon name='docs' size={40} style={{ alignSelf: 'center' }} onPress={() => { this._onPressOpenFile(this.state.fileUrl) }}></Icon>
                            <Text style={{ textAlign: 'center', }}>热门回答</Text>
                        </View>
                        <View style={{ width: screenW / 4, justifyContent: 'center' }}>
                            <Icon name='chart' size={40} style={{ alignSelf: 'center' }}></Icon>
                            <Text style={{ textAlign: 'center', }}>工知榜单</Text>
                        </View>
                        <View style={{ width: screenW / 4, justifyContent: 'center' }}>
                            <TouchableOpacity activeOpacity={0.5} onPress={() => this._download()}>
                                <Icon name='cloud-download' size={40} style={{ alignSelf: 'center' }} ></Icon>
                                <Text style={{ textAlign: 'center', }}>资料下载</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: screenW / 4, justifyContent: 'center' }}>
                            <Icon name='social-dropbox' size={40} style={{ alignSelf: 'center' }}></Icon>
                            <Text style={{ textAlign: 'center', }}>大咖转讲</Text>
                        </View>
                    </View>
                    <View style={{ height: 200, backgroundColor: '#fff' }}>
                        <View style={{ height: 40, flexDirection: 'row', justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: '#213' }}>
                            <Icon style={{ alignSelf: 'center' }} name='rocket' size={20}></Icon>
                            <Text style={{ width: screenW - 150, alignSelf: 'center' }}>热门推荐</Text>
                            <Text style={{ width: 100, alignSelf: 'center' }} onPress={() => { this.props.navigation.navigate('HuatiList', { userName: 'Tory', userInfo: 'Hello' }); }} >查看更多 ></Text>
                        </View>
                    </View>
                    <View style={{ height: 200, backgroundColor: 'pink' }}>
                        <Text onPress={() => { this._upImage() }}> 上传图片 </Text>
                        {this.state.upImageUrl ? <Image source={{ uri: this.state.upImageUrl, width: 150, height: 150 }} /> : null}
                        <Text onPress={()=>{ this._openURL(this.state.imgUrlOnline) }}>查看上传的图片</Text>
                    </View>
                    <View style={{ height: 200, backgroundColor: 'yellow' }}></View>
                </ScrollView>
                <View ref='search' style={styles.search}>
                    <Text style={styles.searchText} onPress={() => this.props.navigation.navigate('Search')}>请输入搜索内容</Text>
                </View>
            </View>
        );
    }

    _onPressItem(item) {
        this.props.navigation.navigate('MyWeb', { userName: 'Tory', userInfo: 'Hello' });
    }
    _onRefresh() {
        this.setState({
            ...this.state,
            currentPage: 1,
            refreshing: true,
            list: []
        }, () => {
            this.getCallLog();
        });

    }
    getCallLog() {
        var _this = this;
        new Promise(function (resolve, reject) {
            var timeOut = Math.random() * 2;
            setTimeout(function () {
                resolve({
                    code: 200,
                    list: [
                        { name: 'FPX', number: 6, person: 10 },
                        { name: 'JDG', number: 7, person: 10 },
                        { name: 'EDG', number: 8, person: 10 },
                        { name: 'QG', number: 9, person: 10 },
                        { name: 'VG', number: 10, person: 10 },
                    ]
                });

            }, timeOut * 1000);
        }).then(function (r) {
            _this.setState({
                refreshing: false,
                list: _this.state.list.concat(r.list)
            });
        }).catch(function (reason) {
            _this.setState({
                refreshing: false
            });
            console.log('Failed: ' + reason);
        });

    }
    _endReached() {
        //let that=this;
        // 判断首屏满屏的情况
        if (this.state.list && this.state.lastPage > this.state.currentPage) {
            this.state.currentPage++;
            this.getCallLog();
        } else {
            //若总数未满一屏，进去就提示
            alert('已加载全部');
        }
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
    },
    item: {
        borderBottomColor: 'skyblue',
        borderBottomWidth: 1,
        height: 100,
        lineHeight: 100
    },
    search: {
        width: screenW,
        height: 40,
        backgroundColor: 'rgba(255,255,255,0)',
        textAlign: 'center',
        position: 'absolute'
    },
    searchText: {
        textAlign: 'center',
        height: 40,
        lineHeight: 40
    }
});