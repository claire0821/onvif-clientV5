export type PanTiltItem = {
    x: string;
    y: string;
    space: string;
}

export type ZoomItem = {
    x: string;
    space: string;
}
export type DefaultPTZSpeedItem = {
    PanTilt: PanTiltItem;
    Zoom: ZoomItem;
}

export type XYRangeItem = {
    Min: string;
    Max: string;
}

export type RangeItem = {
    URI: string;
    XRange: XYRangeItem;
    YRange: XYRangeItem;
}

export type PanTiltLimitsItem = {
    Range: RangeItem;
}

export type ZoomRangeItem = {
    URI: string;
    XRange: XYRangeItem;
}

export type ZoomLimitsItem = {
    Range: ZoomRangeItem;
}
export type PTZConfigurationItem = {
    token: string;
    Name: string;
    UseCount: string;
    NodeToken: string;
    DefaultAbsolutePantTiltPositionSpace: string;
    DefaultAbsoluteZoomPositionSpace: string;
    DefaultRelativePanTiltTranslationSpace: string;
    DefaultRelativeZoomTranslationSpace: string;
    DefaultContinuousPanTiltVelocitySpace: string;
    DefaultContinuousZoomVelocitySpace: string;
    DefaultPTZSpeed: DefaultPTZSpeedItem;
    DefaultPTZTimeout: string;
    PanTiltLimits: PanTiltLimitsItem;
    ZoomLimits: ZoomLimitsItem;
}

export type PTZControlParamsItem = {
    ip: string
    command: number
    speed: number
    profileToken: string
}