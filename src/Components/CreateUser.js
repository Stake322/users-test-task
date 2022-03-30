
import React, { useEffect } from 'react'
import { useContext, useState } from 'react/cjs/react.development'
import { Button, Checkbox, Icon, Segment, Table, Input, Form, Loader, Modal, Dimmer, Header, Dropdown } from 'semantic-ui-react'


const CreateUser = ({ open, setOpen }) => {
    const [active, setActive] = useState(false);

    const [firstName, setFirstName] = useState()
    const [secondName, setSecondName] = useState()
    const [emailUser, setEmailUser] = useState()
    const [rolesUser, setRolesUser] = useState([])
    const [orgUser, setOrgUser] = useState();
    const [rolesValue, setRolesValue] = useState([])


    return (
        <>
            <Button
                floated='right'
                icon='user'
                labelPosition='left'
                primary
                size='small'
                content='Создать пользователя'
                onClick={e => setOpen(true)}
            />
            <Dimmer active={active} >
                <Loader content='Loading' active={active} />
                <Modal
                    closeIcon
                    open={open}
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                >
                    <Header icon='edit outline' content='Создание пользователя' />
                    <Modal.Content>
                        <Form >
                            <Form.Field>
                                <label>Имя</label>
                                <input placeholder={firstName} onChange={e => setFirstName(e.target.value)} />
                            </Form.Field>
                            <Form.Field>
                                <label>Фамилия</label>
                                <input placeholder={secondName} onChange={e => setSecondName(e.target.value)} />
                            </Form.Field>
                            <Form.Field>
                                <label>E-mail</label>
                                <input placeholder={emailUser} onChange={(e) => setEmailUser(e.target.value)} />
                            </Form.Field>
                            <Form.Field>
                                <label>Роль</label>
                                <Dropdown fluid multiple selection placeholder='Выберите свои роли' options={rolesUser} />
                            </Form.Field>
                            <Form.Field>
                                <label>Организация</label>
                                <p>{orgUser}</p>
                            </Form.Field>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={() => setOpen(false)}>
                            <Icon name='remove' /> Закрыть
                        </Button>
                        <Button positive >
                            <Icon name='checkmark' /> Сохранить изменения
                        </Button>
                    </Modal.Actions>
                </Modal >
            </Dimmer >
        </>
    )

}

export default CreateUser;
