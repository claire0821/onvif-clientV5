// 类型定义
export type DevListItem = {
  ip: string;
  port: number;
  username: string;
  password: string;
  onvifAddress: string;
  mediaUrl: string;
  imagingUrl: string;
  eventsUrl: string;
  deviceUrl: string;
  ptzUrl: string;
  analyticsUrl: string;
};

export type SearchListItem = {
  ip: string;
  port: number;
  onvifAddress: string;
};
