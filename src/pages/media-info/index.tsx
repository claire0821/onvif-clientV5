import React, {useEffect} from 'react';
import type { Dispatch } from 'umi';
import { connect } from 'dva';
import {Input,Select,Button,Divider} from 'antd';
import type { StateType } from './model';
import type { DevListItem } from '../devices-management/data'
// import Event from '@/utils/pushlish-subscribe';
import { RedoOutlined } from '@ant-design/icons';
import type { MediaProfilesItem } from './data'
// import { connect } from 'react-redux'

type MediaInfoProps = {
    dispatch: Dispatch;
    mediaInfo: StateType;
    currentDev?: DevListItem
}

const mapStateToProps = (state: any) => {
    const namespace = 'devManagement';
    const currentDev = state[namespace].controlDev;
    const namespace1 = 'mediaInfo';
    const mediaInfo = state[namespace1]
    return {
        currentDev,
        mediaInfo
    };
};

// export default @connect(mapStateToProps)
const MediaPage: React.FC<MediaInfoProps> = (props) => {
    const {
        dispatch,
        mediaInfo,
        currentDev,
    } = props
    // const MediaInfoListen = (dev: any) => {
    //     console.log(props)
    //     console.log('收到信息')
    //     console.log(dev)

    //     // dispatch({
    //     //     type: 'mediaInfo/fetchMediaURL',
    //     //     payload: '1'
    //     // });
    // }
  
//   useEffect(
//     () => {
//       // 这在第一次渲染之后运行
//       console.log(props)
//     //   Event.listen('changeDev', MediaInfoListen)// 订阅控制设备更改信息
//     },
//     // effect 依赖  inputRef
//     []
//   );
    useEffect(() => {
        // console.log(props)
        // console.log(currentDev);
    }, []);
    useEffect(() => {
        const url = currentDev?.mediaUrl
        if(typeof(url) !== 'undefined') {
            dispatch({
                type: 'mediaInfo/changeMediaURL',
                payload: url
            });
        }
        // console.log(currentDev);
    }, [currentDev,dispatch]);

    const handleGetMediaProfile = () => {
        console.log(currentDev)
        dispatch({
            type: 'mediaInfo/fetchMediaProfiles',
            payload: {ip: currentDev?.ip}
        });
    }
    const handleOnSelect = (option: any) => {
        console.log(option)
        dispatch({
            type: 'mediaInfo/fetchMediaInfo',
            payload: {ip: currentDev?.ip,profile: option}
        });
        console.log(mediaInfo)
    }
    const filterOptionText = (item: MediaProfilesItem) => {
        const str = `${item.name}(${item.token})`
        return str
    }
    return (
        <div>
            <div>
                <Input addonBefore="Media URL" value={mediaInfo.url} style={{width: 400}}/>
                <Button type="primary" shape="circle" icon={<RedoOutlined onClick={handleGetMediaProfile}/>} size='middle' />
            </div>
            <Select style={{ minWidth: 200 }} onSelect={handleOnSelect}>
            {mediaInfo.profiles.map(item => (
            <Select.Option key={item.token} value={item.token}>{filterOptionText(item)}</Select.Option>
            ))}
            </Select>
            <Divider orientation="center">Video Source</Divider>
            <div>
                <Input addonBefore="Name" style={{width: 300}} value={mediaInfo.info.VideoSource?.Name} />
                <Input addonBefore="UseCount" style={{width: 300}} value={mediaInfo.info.VideoSource?.UseCount} />
                <Input addonBefore="SourceToken" style={{width: 300}} value={mediaInfo.info.VideoSource?.SourceToken} />
                <Input addonBefore="Bounds.x" style={{width: 300}} value={mediaInfo.info.VideoSource?.Bounds?.x} />
                <Input addonBefore="Bounds.y" style={{width: 300}} value={mediaInfo.info.VideoSource?.Bounds?.y} />
                <Input addonBefore="Bounds.width" style={{width: 300}} value={mediaInfo.info.VideoSource?.Bounds?.width} />
                <Input addonBefore="Bounds.height" style={{width: 300}} value={mediaInfo.info.VideoSource?.Bounds?.height} />
            </div>
            <Divider orientation="center">Video Encoder</Divider>
            <Divider orientation="center">Audio Source</Divider>
            <div>
                <Input addonBefore="Name" style={{width: 300}} value={mediaInfo.info.AudioSource?.Name} />
                <Input addonBefore="UseCount" style={{width: 300}} value={mediaInfo.info.AudioSource?.UseCount} />
                <Input addonBefore="SourceToken" style={{width: 300}} value={mediaInfo.info.AudioSource?.SourceToken} />
            </div>
            <Divider orientation="center">Audio Encoder</Divider>
            <div>
                <Input addonBefore="token" style={{width: 300}} value={mediaInfo.info.AudioEncoder?.token} />
                <Input addonBefore="Name" style={{width: 300}} value={mediaInfo.info.AudioEncoder?.Name} />
                <Input addonBefore="UseCount" style={{width: 300}} value={mediaInfo.info.AudioEncoder?.UseCount} />
                <Input addonBefore="Encoding" style={{width: 300}} value={mediaInfo.info.AudioEncoder?.Encoding} />
                <Input addonBefore="Bitrate" style={{width: 300}} value={mediaInfo.info.AudioEncoder?.Bitrate} />
                <Input addonBefore="SampleRate" style={{width: 300}} value={mediaInfo.info.AudioEncoder?.SampleRate} />
                <Input addonBefore="SessionTimeout" style={{width: 300}} value={mediaInfo.info.AudioEncoder?.SessionTimeout} />
                <Input addonBefore="Multicast.Address.Type" style={{width: 300}} value={mediaInfo.info.AudioEncoder?.Multicast?.Address.Type} />
                <Input addonBefore="Multicast.Address.IPv4Address" style={{width: 300}} value={mediaInfo.info.AudioEncoder?.Multicast?.Address.IPv4Address} />
                <Input addonBefore="Multicast.Port" style={{width: 300}} value={mediaInfo.info.AudioEncoder?.Multicast?.Port} />
                <Input addonBefore="Multicast.TTL" style={{width: 300}} value={mediaInfo.info.AudioEncoder?.Multicast?.TTL} />
                <Input addonBefore="Multicast.AutoStart" style={{width: 300}} value={mediaInfo.info.AudioEncoder?.Multicast?.AutoStart} />
            </div>
        </div>
    )
}

// class MediaPage extends React.Component {
//     // constructor(props: MediaInfoProps) {
//     //     super(props)
//     // }

//     componentDidMount() {
//         console.log(this.props)
//         Event.listen('changeDev', this.MediaInfoListen)// 订阅控制设备更改信息
//     }

//     componentWillUnmount() {
//         Event.remove('changeDev',this.MediaInfoListen)
//     }
//     MediaInfoListen = (dev: any) => {
//         console.log('收到信息')
//         console.log(dev)
//         this.set()
//     }

//     set() {
//         console.log('set')
//         // if(flag) {
//         //     flag = false
//         //     const { dispatch } = this.props;
//         //     dispatch({
//         //         type: 'mediaInfo/fetchMediaURL',
//         //         payload: '1'
//         //     });
//         //     flag = true
//         // }
        
//     }
    
//     render() {
//         return (
//             <div>
//                 {/* <Input addonBefore="Media URL" value={mediaURL}/> */}
//                 {/* <Select options={options}>
    
//                 </Select> */}
//             </div>
//         )
//     }
// }
// export default connect(mapStateToProps, mapDispatchToProps)(AppUI);
// export default connect(({mediaInfo,currentDev}: {mediaInfo: StateType;currentDev: CurrentDev}) => ({
//     mediaInfo,
//     currentDev
// }))(MediaPage);

export default connect(mapStateToProps)(MediaPage);