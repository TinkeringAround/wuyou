import React from 'react'
import { Video as GrommetVideo } from 'grommet'

const Video = ({
  url = 'https://www.audibkk-gesundheit.de/fileadmin/audibkk-gesundheit.de/ausgaben/01-2019/uploads/audi_bkk_artikel_cook_fit/audi_bkk_cook-u-fit_video_loop_1920x1080.mp4'
}) => (
  <GrommetVideo fit="cover" autoPlay loop mute controls={false}>
    <source key="video" src={url} type="video/mp4" />
  </GrommetVideo>
)

export default Video
