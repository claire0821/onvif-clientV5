import React from 'react'
import flvjs from 'flv.js'

type FlvProps = {
    url: string
    type: string
    isLive: boolean
    hasAudio: boolean
    hasVideo: boolean
    flvPlayer: any
}
class Flv extends React.Component<any,FlvProps> {
    constructor(props: FlvProps) {
        super(props)
        this.state = {
            url: '',
            type: 'flv',
            isLive: true,
            hasAudio: true,
            hasVideo: true,
            flvPlayer: null
        }
        // this.initFlv = this.initFlv.bind(this)
    }
    // static propTypes = {
    //     // className: PropTypes.string,
    //     // style: PropTypes.object,
    //     /**
    //      * media URL, can be starts with 'https(s)' or 'ws(s)' (WebSocket)
    //      */
    //     url: PropTypes.string,
    //     /**
    //      * media type, 'flv' or 'mp4'
    //      */
    //     type: PropTypes.oneOf(['flv', 'mp4']).isRequired,
    //     /**
    //      * whether the data source is a **live stream**
    //      */
    //     isLive: PropTypes.bool,
    //     /**
    //      * whether to enable CORS for http fetching
    //      */
    //     cors: PropTypes.bool,
    //     /**
    //      * whether to do http fetching with cookies
    //      */
    //     withCredentials: PropTypes.bool,
    //     /**
    //      * whether the stream has audio track
    //      */
    //     hasAudio: PropTypes.bool,
    //     /**
    //      * whether the stream has video track
    //      */
    //     hasVideo: PropTypes.bool,
    //     /**
    //      * total media duration, in milliseconds
    //      */
    //     duration: PropTypes.bool,
    //     /**
    //      * total file size of media file, in bytes
    //      */
    //     filesize: PropTypes.number,
    //     /**
    //      * Optional field for multipart playback, see MediaSegment
    //      */
    //     segments: PropTypes.arrayOf(PropTypes.shape({
    //         /**
    //          * indicates segment duration in milliseconds
    //          */
    //         duration: PropTypes.number.isRequired,
    //         /**
    //          * indicates segment file size in bytes
    //          */
    //         filesize: PropTypes.number,
    //         /**
    //          * indicates segment file URL
    //          */
    //         url: PropTypes.string.isRequired,
    //     })),
    //     /**
    //      * @see https://github.com/Bilibili/flv.js/blob/master/docs/api.md#config
    //      */
    //     config: PropTypes.object,
    // }

    initFlv = ($video: any) => {
        if ($video) {
            if (flvjs.isSupported()) {
                const player = flvjs.createPlayer({ ...this.state }, this.props.config);
                player.attachMediaElement($video);
                player.load();
                player.play();
                this.state.flvPlayer = player;
            }
        }
    }

    componentWillUnmount () {
        if (this.state.flvPlayer) {
            this.state.flvPlayer.unload();
            this.state.flvPlayer.detachMediaElement();
        }
    }

    render () {
        const { className, style } = this.props;
        return (
            <video
                className={className}
                controls={true}
                // style={Object.assign({
                //     width: '100%',
                // }, style)}
                ref={this.initFlv}
            />
        )
    }
}

export default Flv