import React, { useState, useEffect } from 'react'
import { Button, Header, Icon, Modal, Loader, Dimmer, Input, Form, Select, Dropdown, Message } from 'semantic-ui-react'
import { editUser } from '../api';


const EditUser = ({ open, setOpen, editData, setOpenPop, setMsg }) => {
    const [active, setActive] = useState(false);

    const [firstName, setFirstName] = useState()
    const [secondName, setSecondName] = useState()
    const [emailUser, setEmailUser] = useState()
    const [rolesUser, setRolesUser] = useState([])
    const [orgUser, setOrgUser] = useState();
    const [rolesValue, setRolesValue] = useState([])

    useEffect(() => {
        if (editData) {
            const { name, lastName, email, roles, organization } = editData;
            setFirstName(name)
            setSecondName(lastName)
            setEmailUser(email)
            setOrgUser(organization)
            console.log(roles);
            changeArray(roles)
        }

    }, [editData])
    const onEditUser = () => {
        setOpen(false)
        setActive(true)
        const data = {
            email: emailUser,
            user: {
                name: firstName,
                lastName: secondName
            },
            roles: rolesValue
        }
        editUser(data, editData.id, result => {
            console.log(result);
        });

    }

    useEffect(() => {
        const loaderActive = () => {
            setActive(false);
            setOpenPop(true);
            setMsg("Пользователь был изменен")
        }
        if (active) setTimeout(loaderActive, 1000)

        return () => clearTimeout(loaderActive);
    }, [active])

    const changeArray = (array) => {
        const newArray = array.map(item => ({ ...item, text: item.name, value: item.name }));
        setRolesUser([...newArray]);
    }
    const rolesHandler = (value) => {
        console.log(value);
        let arrayToSend = value.map(item => ({ name: item }))
        setRolesValue(arrayToSend)
    }
    return (
        <Dimmer active={active} >
            <Loader content='Loading' active={active} />
            <Modal
                closeIcon
                open={open}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
            >
                <Header icon='edit outline' content='Редактирование пользователя' />
                <Modal.Content>
                    <Form >
                        <Form.Field >
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
                            <Dropdown fluid multiple selection placeholder='Выберите свои роли' options={rolesUser} onChange={(e, { value }) => rolesHandler(value)} />
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
                    <Button positive onClick={onEditUser}>
                        <Icon name='checkmark' /> Сохранить изменения
                    </Button>
                </Modal.Actions>
            </Modal >
        </Dimmer >
    )
}
export default EditUser;
