import { createClient, createMicrophoneAndCameraTracks} from 'agora-rtc-react'

const token = "YourToken"
const appId = "YourAppId"

export const config = {mode: "rtc", codec: "vp8", appId: appId, token: token}
export const useClient = createClient(config)
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks()
export const channelName = "main"


//Change imports in other files in order to work