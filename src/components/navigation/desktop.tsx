import React, {FC} from 'react'

// ===============================================
interface Props {
    pages: Array<string>
    ids: Array<string>
    scrolled: boolean
    close: any
    isMedium: boolean
}

// ===============================================
const Desktop: FC<Props> = ({pages, ids, scrolled, close, isMedium}) => {
    const listItem = {
        display: 'inline',
        fontSize: isMedium ? '0.8em' : '1em',
        fontWeight: 600,
        fontFamily: 'Roboto Mono',
        margin: '0 0.75em',
        cursor: 'pointer'
    }

    return (
        <nav style={{margin: '0 1em 0 0'}}>
            <ul style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
                {pages.map((page: string, index: number) => (
                    <li
                        key={'NavigationItem-' + index}
                        className={'zoomOnHover ' + (scrolled ? 'blackText' : 'whiteText')}
                        style={listItem}
                        onClick={() => {
                            const element = document.getElementById(ids[index])
                            if (element)
                                element.scrollIntoView({
                                    block: element.id === 'home' ? 'end' : 'start',
                                    behavior: 'smooth'
                                })
                            close()
                        }}
                    >
                        {page}
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Desktop
