import {TTraining, TFooter, TOpinions, TPosition, TLogo, THome, TMedia, TNotification} from '.'

declare module 'home.json' {
    const home: THome
    export default home
}

declare module 'logo.json' {
    const logo: TLogo
    export default logo
}

declare module 'notification.json' {
    const notification: TNotification
    export default notification
}

declare module 'footer.json' {
    const footer: TFooter
    export default footer
}

declare module 'gallery.json' {
    const gallery: Array<TMedia>
    export default gallery
}

declare module 'opinions.json' {
    const opinions: TOpinions
    export default opinions
}

declare module 'position.json' {
    const position: TPosition
    export default position
}

declare module 'training.json' {
    const training: TTraining
    export default training
}
