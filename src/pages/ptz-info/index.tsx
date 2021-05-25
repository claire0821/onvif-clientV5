import React from 'react'
import type { Dispatch } from 'umi';
import { connect } from 'dva';
import type { StateType } from './model';
import type { DevListItem } from '../devices-management/data';
import {Input,Select,Button,Divider,Slider,Row,Col,InputNumber,Tooltip} from 'antd';
import type { MediaProfilesItem } from '../media-info/data';
import { CaretUpOutlined,CaretDownOutlined,CaretLeftOutlined,CaretRightOutlined,RedoOutlined,ZoomInOutlined,ZoomOutOutlined} from '@ant-design/icons';
import { ptzControl } from './service';
import type {PTZControlParamsItem} from './data';

<CaretUpOutlined style={{ transform: 'rotate(90deg)' }} />;

type PTZInfoProps = {
    dispatch: Dispatch
    ptzInfo: StateType
    currentDev?: DevListItem
    mediaUrl: string
    ptzUrl: string
    meidaProfiles: MediaProfilesItem[]
    ptzX: number | string
    ptzY: number | string
    zoomX: number | string
    profile: string
}

const mapStateToProps = (state: any) => {
    const namespace = 'devManagement';
    const currentDev = state[namespace].controlDev;
    const namespace1 = 'ptzInfo';
    const ptzInfo = state[namespace1]
    const namespace2 = 'mediaInfo';
    const meidaProfiles = state[namespace2].profiles
    return {
        currentDev,
        ptzInfo,
        meidaProfiles,
    }
}

const PTZPage: React.FC<PTZInfoProps> = (props) => {
    const {
        dispatch,
        ptzInfo, 
        currentDev,
        meidaProfiles,
    } = props
    const [ptzX,setPTZX] = React.useState(0)
    const [ptzY,setPTZY] = React.useState(0)
    const [zoomX,setZoomX] = React.useState(0)
    const [profile,setProfile] = React.useState('')

    const handleGetMediaProfile = () => {
        dispatch({
            type: 'mediaInfo/fetchMediaProfiles',
            payload: {ip: currentDev?.ip}
        });
    }
    const filterOptionText = (item: MediaProfilesItem) => {
        const str = `${item.name}(${item.token})`
        return str
    }
    const handleOnSelect = (option: any) => {
        setProfile(option)
        dispatch({
            type: 'ptzInfo/fetchPTZInfo',
            payload: {ip: currentDev?.ip,profile: option}
        });

    }
    const handlePTZXChange = (value: string | number) => {
        console.log(value)
        setPTZX(Number(value))
    }
    const handlePTZYChange = (value: string | number) => {
        console.log(value)
        setPTZY(Number(value))
    }
    const handleZoomXChange = (value: string | number) => {
        console.log(value)
        setZoomX(Number(value))
    }

    const handlePTZStart = (value: any) => {
        console.log(value.currentTarget.id)
        const params: Partial<PTZControlParamsItem> = {}
        params.ip = currentDev?.ip
        params.command = value.currentTarget.id
        params.speed = 0.5
        params.profileToken =profile

        ptzControl(params).then(res => {
            console.log(res)
        })
    }
    const handlePTZStop = () => {
        const params: Partial<PTZControlParamsItem> = {}
        params.ip = currentDev?.ip
        params.command = 0
        params.speed = 0.5
        params.profileToken =profile

        ptzControl(params).then(res => {
            console.log(res)
        })
    }
    return (
        <div>
            <div>
                <Input addonBefore="Media URL" value={currentDev?.mediaUrl} style={{width: 400}}/>
                <Button type="primary" shape="circle" icon={<RedoOutlined onClick={handleGetMediaProfile}/>} size='middle' />
            </div>
            <div>
            <Select style={{ minWidth: 200 }} onSelect={handleOnSelect} value={profile}>
            {meidaProfiles.map(item => (
            <Select.Option key={item.token} value={item.token}>{filterOptionText(item)}</Select.Option>
            ))}
            </Select>
            </div>
            <div style={{width: 300}}>
                <Row>
                    <Col span={2}><label>X</label></Col>
                    <Col span={10}>
                        <Slider
                            min={Number(ptzInfo.info.PanTiltLimits?.Range.XRange.Min)}
                            max={Number(ptzInfo.info.PanTiltLimits?.Range.XRange.Max)}
                            value={typeof ptzX === 'number' ? ptzX : 0}
                            step={0.1}
                            onChange={handlePTZXChange}
                            style={{width:150}}
                        />
                    </Col>
                    <Col span={4}>
                        <InputNumber
                            min={ptzInfo.info.PanTiltLimits?.Range.XRange.Min}
                            max={ptzInfo.info.PanTiltLimits?.Range.XRange.Max}
                            value={String(ptzX)}
                            style={{ margin: '0 16px' }}
                            step={0.1}
                            onChange={handlePTZXChange}
                        />
                    </Col>
                  
                </Row>
                <Row>
                    <Col span={2}><span>Y</span></Col>
                    <Col span={10}>
                    <Slider
                        min={Number(ptzInfo.info.PanTiltLimits?.Range.YRange.Min)}
                        max={Number(ptzInfo.info.PanTiltLimits?.Range.YRange.Max)}
                        value={typeof ptzY === 'number' ? ptzY : 0}
                        step={0.1}
                        onChange={handlePTZYChange}
                    />
                    </Col>
                    <Col span={4}>
                    <InputNumber
                        min={ptzInfo.info.PanTiltLimits?.Range.YRange.Min}
                        max={ptzInfo.info.PanTiltLimits?.Range.YRange.Max}
                        value={String(ptzY)}
                        style={{ margin: '0 16px' }}
                        step={0.1}
                        onChange={handlePTZYChange}
                    />
                    </Col>
                </Row>
                <Row>
                    <Col span={2}><span>Zoom</span></Col>
                    <Col span={10}>
                    <Slider
                        min={Number(ptzInfo.info.ZoomLimits?.Range.XRange.Min)}
                        max={Number(ptzInfo.info.ZoomLimits?.Range.XRange.Max)}
                        value={typeof zoomX === 'number' ? zoomX : 0}
                        step={0.1}
                        onChange={handleZoomXChange}
                    />
                    </Col>
                    <Col span={4}>
                    <InputNumber
                        min={ptzInfo.info.ZoomLimits?.Range.XRange.Min}
                        max={ptzInfo.info.ZoomLimits?.Range.XRange.Max}
                        value={String(zoomX)}
                        style={{ margin: '0 16px' }}
                        step={0.1}
                        onChange={handleZoomXChange}
                    />
                    </Col>
                </Row>
            </div>
            <Divider orientation="center">Continuous Move</Divider>
            <Row>
                <div style={{width:140}}>
                    <Row>
                        <Col span={8}> <Button id="5" type="dashed" icon={<CaretUpOutlined/>} size='large' style={{margin: 5}} onMouseDown={handlePTZStart} onMouseUp={handlePTZStop}/></Col>
                        <Col span={8}> <Button id='1' type="dashed" icon={<CaretUpOutlined />} size='large' style={{margin: 5}} onMouseDown={handlePTZStart} onMouseUp={handlePTZStop}/></Col>
                        <Col span={8}> <Button id='7' type="dashed" icon={<CaretUpOutlined />} size='large' style={{margin: 5}} onMouseDown={handlePTZStart} onMouseUp={handlePTZStop}/></Col>
                        <Col span={8}> <Button id='3' type="dashed" icon={<CaretLeftOutlined />} size='large' style={{margin: 5}} onMouseDown={handlePTZStart} onMouseUp={handlePTZStop}/></Col>
                        <Col span={8}> <Button type="dashed" icon={<RedoOutlined />} size='large' style={{margin: 5}} onMouseDown={handlePTZStart} onMouseUp={handlePTZStop}/></Col>
                        <Col span={8}> <Button id='4' type="dashed" icon={<CaretRightOutlined />} size='large' style={{margin: 5}} onMouseDown={handlePTZStart} onMouseUp={handlePTZStop}/></Col>
                        <Col span={8}> <Button id='6' type="dashed" icon={<CaretUpOutlined />} size='large' style={{margin: 5}} onMouseDown={handlePTZStart} onMouseUp={handlePTZStop}/></Col>
                        <Col span={8}> <Button id='2' type="dashed" icon={<CaretDownOutlined />} size='large' style={{margin: 5}} onMouseDown={handlePTZStart} onMouseUp={handlePTZStop}/></Col>
                        <Col span={8}> <Button id='8' type="dashed" icon={<CaretUpOutlined />} size='large' style={{margin: 5}} onMouseDown={handlePTZStart} onMouseUp={handlePTZStop}/></Col>
                    </Row>
                </div>
                <div style={{marginLeft: 10,width: 150}}>
                    <Row>
                        <Col span={12}> 
                            <Tooltip title="镜头拉近">
                                <Button id="9" type="dashed" icon={<ZoomInOutlined />} size='large' style={{margin: 5}} onMouseDown={handlePTZStart} onMouseUp={handlePTZStop}/>
                            </Tooltip>
                        </Col>
                        <Col span={12}> 
                            <Tooltip title="镜头推远">
                                <Button id="10" type="dashed" icon={<ZoomOutOutlined/>} size='large' style={{margin: 5}} onMouseDown={handlePTZStart} onMouseUp={handlePTZStop}/>
                            </Tooltip>
                        </Col>
                        <Col span={12}> 
                            <Tooltip title="光圈放大">
                                <Button id="11" type="dashed" icon={<ZoomInOutlined />} size='large' style={{margin: 5}} onMouseDown={handlePTZStart} onMouseUp={handlePTZStop}/>
                            </Tooltip>
                        </Col>
                        <Col span={12}> 
                            <Tooltip title="光圈缩小">
                                <Button id="12" type="dashed" icon={<ZoomOutOutlined/>} size='large' style={{margin: 5}} onMouseDown={handlePTZStart} onMouseUp={handlePTZStop}/>
                            </Tooltip>
                        </Col>
                        <Col span={12}> 
                            <Tooltip title="焦距增加">
                                <Button id="13" type="dashed" icon={<ZoomInOutlined />} size='large' style={{margin: 5}} onMouseDown={handlePTZStart} onMouseUp={handlePTZStop}/>
                            </Tooltip>
                        </Col>
                        <Col span={12}> 
                            <Tooltip title="焦距减小">
                                <Button id="14" type="dashed" icon={<ZoomOutOutlined/>} size='large' style={{margin: 5}} onMouseDown={handlePTZStart} onMouseUp={handlePTZStop}/>
                            </Tooltip>
                        </Col>
                    </Row>
                </div>
            </Row>
          

        </div>
    )
}

export default connect(mapStateToProps)(PTZPage)