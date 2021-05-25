import React from 'react'
import Flv from './components/Flv'
import { connect } from 'dva';
import type { Dispatch } from 'umi';
import {Button, Input, Select, Radio, Checkbox} from 'antd';
import flvjs from 'flv.js'
import type FlvJs from 'flv.js';
import type { DevListItem } from '../devices-management/data'
import type { StateType } from '../media-info/model';
import { RedoOutlined } from '@ant-design/icons';
import styles from './style.less';

const options = ['ws', 'http'];
const flvOptions = [
    { label: 'isLive', value: 'isLive' },
    { label: 'hasAudio', value: 'hasAudio' },
    { label: 'hasVideo', value: 'hasVideo' },
    { label: 'withCredentials', value: 'withCredentials' },
];

type VideoProps = {
    dispatch: Dispatch
    currentDev?: DevListItem // 当前控制设备
    mediaInfo: StateType
    flvType: string // http-flv ws-flv
    flvValue: []
    rtspUrl: string
    flvPlayer: any
    flvMedia: FlvJs.MediaDataSource
    flvConfig: FlvJs.Config
}

const mapStateToProps = (state: any) => {
    const namespace = 'devManagement';
    const currentDev = state[namespace].controlDev;
    const namespace1 = 'ptzInfo';
    const ptzInfo = state[namespace1]
    const namespace2 = 'mediaInfo';
    const mediaInfo = state[namespace2]
    return {
        currentDev,
        ptzInfo,
        mediaInfo,
    }
}

const Video: React.FC<VideoProps> = ({
    dispatch,
    flvPlayer,
    currentDev,
    mediaInfo
}) => {
    const [rtspUrl, setRtspUrl] = React.useState('ws://127.0.0.1:9998/stream=rtsp://admin:admin123456@10.20.30.104:554/type=0%26amp;id=1');
    const [flvMedia, setFlvMedia] = React.useState({
        type: 'flv',
        isLive: true,
        cors: true,
        withCredentials: false,
        hasAudio: true,
        hasVideo: true,
        duration: 0,
        filesize: 0,
        url: 'http://192.168.1.115:7001/live/movie.flv',
        segments: [],
    });
    const [flvConfig, setFlvConfig] = React.useState(null);
    const [flvType, setFlvType] = React.useState('ws');
    const [flvValue, setFlvValue] = React.useState(['isLive','hasVideo']);
    React.useEffect(() => {
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
        dispatch({
            type: 'mediaInfo/fetchMediaProfiles',
            payload: {ip: currentDev?.ip}
        });
    }
    const handleOnSelect = (option: any) => {
        console.log(option)
        dispatch({
            type: 'mediaInfo/fetchStreamUri',
            payload: {ip: currentDev?.ip,profileToken: option}
        });
        console.log(mediaInfo)
    }
    const filterOptionText = (item: MediaProfilesItem) => {
        const str = `${item.name}(${item.token})`
        return str
    }
    const handleChangeFlvType = (value: any) => {
        setFlvType(value.target.value)
    }
// #region  flv
    const destory = () => {
        if(flvPlayer != null) {
            flvPlayer.pause()
            flvPlayer.unload()
            flvPlayer.detachMediaElement()
            flvPlayer.destroy()
            flvPlayer = null
        }
    }
    const handlePlay = () => {
        destory()
        const videoElement = document.getElementById('videoElement')
        console.log(flvMedia)
        if (flvjs.isSupported()) {
            flvPlayer = flvjs.createPlayer({type: 'flv',
            url:'ws://127.0.0.1:9998/stream=rtsp://10.20.30.176:554/PR0',
            isLive:true,
            hasVideo:true});
            flvPlayer.attachMediaElement(videoElement);
            flvPlayer.load();
            flvPlayer.play();
        }
    }
    const flv_load_mds = () => {
        const element = document.getElementById('videoElement');
        if (typeof flvPlayer !== "undefined") {
            if (flvPlayer != null) {
                flvPlayer.unload();
                flvPlayer.detachMediaElement();
                flvPlayer.destroy();
                flvPlayer = null;
            }
        }
        let stream = ''
        if(flvType === 'ws') {
            stream = `ws://127.0.0.1:9998?stream=${mediaInfo.streamUri}`
        } else if(flvType === 'http') {
            stream = `http://127.0.0.1:9998?stream=${mediaInfo.streamUri}`
        }
        const mediaDataSource = {
            type: 'flv',
            url: stream,
            isLive: true,
            hasVideo:true,
            withCredentials: false,
            hasAudio: false,
        }
        flvPlayer = flvjs.createPlayer(mediaDataSource, {
            enableWorker: false,
            lazyLoadMaxDuration: 3 * 60,
            seekType: 'range',
        });
        flvPlayer.attachMediaElement(element);
        flvPlayer.load();
        flvPlayer.play();
    }

    const flv_load = () => {
        if(!flvjs.isSupported()) {
            console.log('不支持')
            return
        }
        flv_load_mds()
    }

    const flv_destroy = () => {
        flvPlayer.pause();
        flvPlayer.unload();
        flvPlayer.detachMediaElement();
        flvPlayer.destroy();
        flvPlayer = null;
    }
 // #endregion
    
    return(
        <div className={styles.videoMain}>
            <div className={styles.videoHeader}>
            <Input addonBefore="Media URL" value={mediaInfo.url} style={{width: 400}}/>
                    <Button type="primary" shape="circle" icon={<RedoOutlined onClick={handleGetMediaProfile}/>} size='middle' />
        
                    <Select style={{ minWidth: 200 }} onSelect={handleOnSelect}>
                    {mediaInfo.profiles.map(item => (
                    <Select.Option key={item.token} value={item.token}>{filterOptionText(item)}</Select.Option>
                    ))}
                    </Select>
            </div>
            <video id="videoElement" controls={true} className={styles.videoFlv}/>
            <div>
                <Input addonBefore="流地址" defaultValue="" value={mediaInfo.streamUri}
                style={{minWidth: 400,width: 'Auto'}}/>
                <Radio.Group options={options} value={flvType} onChange={handleChangeFlvType}/>
                <Checkbox.Group options={flvOptions} value={flvValue} />
                <Button type="primary" onClick={flv_load}>播放</Button>
                <Button type="primary" onClick={flv_destroy}>结束</Button>
            </div>
        </div>
    )
}

export default connect(mapStateToProps)(Video)
