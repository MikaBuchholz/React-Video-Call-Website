import { useState } from "react";
import { useClient } from "./settings";
import { Grid, Button } from "@material-ui/core"
import MicIcon from "@material-ui/icons/Mic";
import MicOffIcon from "@material-ui/icons/MicOff";
import VideocamIcon from "@material-ui/icons/Videocam";
import VideocamOffIcon from "@material-ui/icons/VideocamOff";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

export default function Controls(props) {
    const client = useClient();
    const {tracks, setStart, setInCall} = props;
    const [trackState, setTrackState] = useState({video: true, audio: true})

    const leaveChannel = async () => {
        await client.leave()
        client.removeAllListeners()
        tracks[0].close()
        tracks[1].close()
        setStart(false)
        setInCall(false)
    }

    const mute = async (mediaType) =>  {
        if (mediaType === "audio") {
            await tracks[0].setEnabled(!trackState.audio)
            setTrackState((ps) => {
                return {...ps, audio: !ps.audio}
            })
        }

        if (mediaType === "video") {
            await tracks[1].setEnabled(!trackState.video)
            setTrackState((ps) => {
                return {...ps, video: !ps.video}
            })
        }
    }

    return (
        <Grid container spacing = {2} alignItems = "center">
            <Grid item>
                <Button variant = "contained" color = {trackState.audio ? "primary" : "secondary" } onClick={() => mute("audio")}>
                    {trackState.audio ? <MicIcon/> : <MicOffIcon/>}
                    
                </Button>
            </Grid>
            <Grid item>
                <Button variant = "contained" color = {trackState.video ? "primary" : "secondary"}  onClick={() => mute("video")}>
                    {trackState.video ? <VideocamIcon/> : <VideocamOffIcon/>}
                   
                </Button>
            </Grid>
            <Grid item>
                <Button variant = "contained" color = "default" onClick={() => leaveChannel()}>
                    {<ExitToAppIcon/>}
                    Leave
                </Button>
            </Grid>
        </Grid>
    )
}