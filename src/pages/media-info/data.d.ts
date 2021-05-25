export type MediaProfilesItem = {
    token: string;
    name: string;
}

export type BoundsDataType = {
    x: string;
    y: string;
    width: string;
    height: string;
}

export type AddressDataType = {
    Type: string;
    IPv4Address: string;
}

export type MulticastDataType = {
    Address: AddressDataType;
    Port: string;
    TTL: string;
    AutoStart: string;
}

export type VideoSourceDataType = {
    UseCount: string;
    Bounds: BoundsDataType;
    SourceToken: string;
    token: string;
    Name: string;
}

export type AudioSourceDataType = {
    token: string;
    Name: string;
    UseCount: string;
    SourceToken: string;
}

export type AudioEncoderDataType = {
    token: string;
    Name: string;
    UseCount: string;
    Encoding: string;
    Bitrate: string;
    SampleRate: string;
    Multicast: MulticastDataType;
    SessionTimeout: string;
}


export type MediaInfoDataType = {
    token: string;
    name: string;
    VideoSource: Partial<VideoSourceDataType>;
    AudioSource: Partial<AudioSourceDataType>;
    AudioEncoder: Partial<AudioEncoderDataType>
}