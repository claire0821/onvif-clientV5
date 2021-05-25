import React, { useEffect } from 'react';
import { Table, Button, Descriptions, Divider, Select, Modal, Form, Input } from 'antd';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import type { StateType } from './model';
import { PageContainer } from '@ant-design/pro-layout';
import type { DevListItem, SearchListItem } from './data.d';
import type { ColumnProps } from 'antd/lib/table';

type DevManagementProps = {
  dispatch: Dispatch;
  devManagement: StateType;
  ipSegment: string; // 选择ip段
};

// const handleAdd = async(fields: DevListItem) => {

// }

const DevList: React.FC<DevManagementProps> = ({
  dispatch,
  devManagement: { devList, localIP, searchList },
}) => {
  // 监听状态变化
  useEffect(() => {
    console.log('init');
    dispatch({
      type: 'devManagement/fetch',
    });
    dispatch({
      type: 'devManagement/fetchLocalIP',
    });
  }, [dispatch]);

  const [ipSegment, setIPSegment] = React.useState('');
  const [visible, setVisible] = React.useState(false); // 添加设备窗口
  const [options,setOptions] = React.useState([])
  const [devForm] = Form.useForm();
  useEffect(() => {
    console.log(ipSegment);
  }, [ipSegment]);
  useEffect(() => {
    console.log()
    interface option {
      value: string;
      label: string;
    }
    const ips: option[] = []

    localIP.forEach(element => {
    
      const str: option = {value: element, label: element}
      ips.push(str)
    });
    setOptions(ips)
}, [localIP]);
  const columns: ColumnProps<DevListItem>[] = [
    {
      title: 'IP',
      dataIndex: 'ip',
    },
    {
      title: '端口',
      dataIndex: 'port',
    },
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '密码',
      dataIndex: 'password',
    },
    {
      title: '地址',
      dataIndex: 'onvifAddress',
    },
    {
      align: 'center',
      title: '操作',
      dataIndex: '',
      render: () => {
        return (
          <div>
            <Button type="link">修改</Button>
            <Button type="link">删除</Button>
          </div>
        );
      },
    },
  ];

  const columnsSearch: ColumnProps<SearchListItem>[] = [
    {
      title: 'IP',
      dataIndex: 'ip',
    },
    {
      title: '端口',
      dataIndex: 'port',
    },
    {
      title: '地址',
      dataIndex: 'onvifAddress',
    },
  ];
  const onSelectIPSegment = (value: string) => {
    setIPSegment(value);
  };

  const handleSearch = () => {
    console.log(ipSegment);
    dispatch({
      type: 'devManagement/SearchDev',
      payload: { ipSegment },
    });
  };

  const handleAddDev = (record: SearchListItem) => {
    console.log(record);
    setVisible(true);
    devForm.setFieldsValue({ ip: record.ip, port: record.port, onvifAddress: record.onvifAddress });
  };

  // 添加成功关闭窗口
  const handleOk = () => {
    // setVisible(false);
    console.log(devForm);
    dispatch({
      type: 'devManagement/fetchAddDev',
      payload: {
        address: devForm.getFieldValue('onvifAddress'),
        username: devForm.getFieldValue('username'),
        password: devForm.getFieldValue('password'),
      },
    });
  };
  // 取消添加关闭窗口
  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <PageContainer>
      <Divider orientation="center">设备搜索</Divider>
      <div>
        <Button type="primary">刷新</Button>
        <Select style={{ width: 150 }} value={ipSegment} onSelect={onSelectIPSegment}
          options={options}>
          {/* {localIP.map((ip) => (
            <Option key={ip}>{ip}</Option>
          ))} */}
        
        </Select>
        <Button type="primary" onClick={handleSearch}>
          搜索
        </Button>
        <Table<SearchListItem>
          columns={columnsSearch}
          dataSource={searchList}
          rowKey="onvifAddress"
          scroll={{ y: 300 }}
          onRow={(record) => {
            return {
              onDoubleClick: () => {
                handleAddDev(record);
              },
            };
          }}
        />
      </div>
      <Divider orientation="center">设备列表</Divider>
      <Table<DevListItem>
        columns={columns}
        dataSource={devList}
        rowKey="onvifAddress"
        expandable={{
          expandedRowRender: (record) => {
            return (
              <Descriptions title="详细信息">
                <Descriptions.Item label="media">{record.mediaUrl}</Descriptions.Item>
                <Descriptions.Item label="image">{record.imagingUrl}</Descriptions.Item>
                <Descriptions.Item label="event">{record.eventsUrl}</Descriptions.Item>
                <Descriptions.Item label="device">{record.deviceUrl}</Descriptions.Item>
                <Descriptions.Item label="ptz">{record.ptzUrl}</Descriptions.Item>
                <Descriptions.Item label="analytics">{record.analyticsUrl}</Descriptions.Item>
              </Descriptions>
            );
          },
          rowExpandable: (record) =>
            record.mediaUrl.length !== 0 ||
            record.imagingUrl.length !== 0 ||
            record.eventsUrl.length !== 0 ||
            record.deviceUrl.length !== 0 ||
            record.ptzUrl.length !== 0 ||
            record.analyticsUrl.length !== 0,
        }}
      />
      <Button type="primary">添加</Button>

      {/* 添加设备窗口 */}
      <Modal title="添加设备" visible={visible} onOk={handleOk} onCancel={handleCancel}>
        <Form form={devForm}>
          <Form.Item label="ip" name="ip" rules={[{ required: true, message: 'ip' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="端口" name="port">
            <Input />
          </Form.Item>
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="地址"
            name="onvifAddress"
            rules={[{ required: true, message: '请输入地址' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};

// export default connect(({ devManagement }: { devManagement: ModelType }) => ({
//   data: devManagement.step,
// }))(DevList);
// export default connect()

// export default connect(({ devManagement }: { devManagement: StateType }) => ({
//   list: devManagement.devList,
// }))(DevList);
export default connect(({ devManagement }: { devManagement: StateType }) => ({
  devManagement,
}))(DevList);
