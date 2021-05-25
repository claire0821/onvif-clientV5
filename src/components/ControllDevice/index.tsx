import React, {useEffect}from 'react';
import {Select, Button} from 'antd';
import type {StateType} from '@/pages/devices-management/model';
import type {StateType as DevStateType} from '@/pages/device-info/model';
import type { Dispatch } from 'umi';
import { connect } from 'umi';

type DevSelectProps = {
    dispatch: Dispatch;
    devManagement: StateType;
    list: string[];
    devIP: string;// 选择设备
  };
  

const DevSelect: React.FC<DevSelectProps> = ({
    dispatch,
    devManagement,
    devIP
}) => {

    // const [options,setOptions] = React.useState([])
    // useEffect(() => {
    //     console.log('control')
    //     const devs: [] = []
    //     devManagement.devList.forEach(element => {
    //         const str  = {value: element.ip, label: element.ip}
    //         devs.push(str)
    //     });
    //     setOptions(devs)
    // }, [devManagement.devList]);

    useEffect(() => {
        console.log(devIP);
      }, [devIP]);

    const handleOnSelect = (value: string) => {
        dispatch({
            type: 'devManagement/fetchControlDev',
            payload: value
        });
        dispatch({
            type: 'deviceInfo/fetchDevInfo',
            payload: {ip: value}
        });
    }
    const handleRefresh = () => {
        dispatch({
            type: 'devManagement/fetch'
        });
    }
    return (
        <div>
            <Button onClick={handleRefresh}>刷新</Button>
            <Select style={{ minWidth: 200 }} onSelect={handleOnSelect}>
            {devManagement.devList.map(item => (
            <Select.Option key={item.ip} value={item.ip}>{item.ip}</Select.Option>
            ))}
            </Select>
            {/* <Select style={{ width: 150 }}
            options={options} onSelect={handleOnSelect}>
            </Select> */}
        </div>

    );
};

export default connect(({ devManagement,deviceInfo }: { devManagement: StateType,deviceInfo: DevStateType }) => ({
    devManagement,deviceInfo
  }))(DevSelect);