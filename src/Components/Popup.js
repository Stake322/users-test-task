import React, { useEffect } from 'react'
import {
    Header,
    Segment,
    TransitionablePortal,
} from 'semantic-ui-react'


function Popup({ open, info, setOpen }) {
    useEffect(() => {
        const closePopup = () => {
            setOpen(false);
        }
        if (open) setTimeout(closePopup, 1500)

        return () => clearTimeout(closePopup);
    }, [open])
    return (
        <div>
            <TransitionablePortal open={open}>
                <Segment
                    textAlign='center'
                    style={{ left: '80%', position: 'fixed', top: '0%', zIndex: 1000 }}
                >
                    <Header>{info}</Header>
                </Segment>
            </TransitionablePortal>

        </div>
    );
}

export default Popup;

