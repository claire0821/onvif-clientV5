import React from 'react';
import type { StateType } from './model';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { Input } from 'antd';

type DevInfoProps = {
    dispatch: Dispatch;
    deviceInfo: StateType;
}

const Device: React.FC<DevInfoProps> = ({
    dispatch,
    deviceInfo: {devInfo}
}) => {
    return (
        <PageContainer>
            <div>
                <Input addonBefore="Serial Number" value={devInfo.SerialNumber} style={{width: 200}}/>
                <Input addonBefore="HardwareId" value={devInfo.HardwareId}/>
                <Input addonBefore="Manufacturer" value={devInfo.Manufacturer}/>
                <Input addonBefore="Model" value={devInfo.Model}/>
                <Input addonBefore="Firmware Version" value={devInfo.FirmwareVersion}/>
            </div>
        </PageContainer>
    )
}


export default connect(({ deviceInfo }: { deviceInfo: StateType }) => ({
    deviceInfo,
  }))(Device);