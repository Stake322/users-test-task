import React, { useState, useEffect } from 'react'
import { Button, Header, Icon, Modal, Loader, Dimmer } from 'semantic-ui-react'

import { deleteUser } from '../api'

const ModalWindow = ({ open, setOpen, emailDelete }) => {
    const [active, setActive] = useState(false);



    const onDelete = () => {
        setOpen(false)
        console.log(emailDelete);
        deleteUser(emailDelete, result => {
            console.log(result);
        });
        setActive(true)


    }
    useEffect(() => {
        const loaderActive = () => {
            setActive(false);
            window.location.reload()
        }
        if (active) {
            setTimeout(loaderActive, 1000)
        }
        return () => clearTimeout(loaderActive);
    }, [active])

    return (
        <Dimmer active={active} >
            <Loader content='Loading' active={active} />
            <Modal
                closeIcon
                open={open}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
            >
                <Modal.Content>
                    <Header icon='user delete' content='Вы действительно хотите удалить пользователя?' />
                </Modal.Content>
                <Modal.Actions>
                    <Button negative onClick={() => setOpen(false)}>
                        <Icon name='remove' /> Нет
                    </Button>
                    <Button positive onClick={onDelete}>
                        <Icon name='checkmark' /> Да
                    </Button>
                </Modal.Actions>

            </Modal >
        </Dimmer>
    )
}
export default ModalWindow;
