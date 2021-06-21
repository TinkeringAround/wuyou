import React, {FC, useState} from 'react';
import {Box, Card, CardBody, CardFooter, CardHeader, Heading} from "grommet";

// Types
import {TNotificationItem} from "../../types";

// Atoms
import Button from "../../atoms/button";
import {close} from "../../atoms/icons";
import {Simple} from "../../atoms/animation";

// ===============================================
interface Props {
    notification: TNotificationItem | null
}

// ===============================================
const NotificationDesktop: FC<Props> = ({notification}) => {
    const [show, setShow] = useState<boolean>(!!notification);

    const iconSize = '1.5rem'

    return (
        <Simple pose={show ? 'visible' : 'hidden'}>
            <Card width="medium" background="light" pad="medium" style={{
                position: 'fixed',
                bottom: '3rem',
                right: '3rem',
                zIndex: 100,
            }}>
                <Box
                    width="fit-content"
                    height="fit-content"
                    style={{
                        position: 'absolute',
                        top: '0.75rem',
                        right: '0.75rem'
                    }}
                    onClick={() => setShow(false)}
                >
                    <svg className="icon" width={iconSize} height={iconSize} viewBox={close.viewport}>
                        {close.path}
                    </svg>
                </Box>
                <CardHeader pad="0.5rem 0 0.5rem 0">
                    <Heading size="1.75rem" margin="0" color="red"
                             style={{fontFamily: 'Roboto mono'}}>{notification?.title}</Heading>
                </CardHeader>
                <CardBody style={{fontSize: '0.9rem', lineHeight: '1.25rem'}}>{notification?.content}</CardBody>
                <CardFooter justify="start" background="lightGrey" pad={{top: 'small'}}>
                    <Button fontSize="1rem" link={notification?.media.url}>
                        {notification?.media.title}
                    </Button>
                </CardFooter>
            </Card>
        </Simple>
    )
}

export default NotificationDesktop;
