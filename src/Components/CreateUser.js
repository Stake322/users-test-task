import React, { useEffect } from 'react'
import { useContext, useState } from 'react/cjs/react.development'
import { Button, Checkbox, Icon, Segment, Table, Input, Form, Loader, Modal, Dimmer, Header, Dropdown, Label } from 'semantic-ui-react'
import { getOrganizations, registration } from '../api'
import Error from './Error'
const CreateUser = ({ open, setOpen, setMsg, setOpenPop }) => {
    const [active, setActive] = useState(false);
    const [firstName, setFirstName] = useState()
    const [secondName, setSecondName] = useState()
    const [password, setPassword] = useState()
    const [emailUser, setEmailUser] = useState()
    const [brithday, setBridthday] = useState()
    const [orgUser, setOrgUser] = useState([]);
    const [organization, setOrganization] = useState();
    const [rolesValue, setRolesValue] = useState([])
    const [admin, setAdmin] = useState();
    const [errName, setErrName] = useState(false);
    const [errLastName, setErrLastName] = useState(false);
    const [errEmail, setErrEmail] = useState(false);
    const [errPassword, setErrPassword] = useState(false);
    const [errRoles, setErrRoles] = useState(false);
    const [errOrg, setErrOrg] = useState(false);
    const [errDate, setErrDate] = useState(false);


    const rolesOptions = [
        {
            text: 'ROLE_ADMIN',
            value: 'ROLE_ADMIN',
        },
        {
            text: 'ROLE_USER',
            value: 'ROLE_USER',
        },

    ]
    const handleCreate = () => {
        if (firstName && secondName && brithday && password && admin !== "1" && organization && emailUser) {
            setOpen(false)
            let id = Math.random().toString().slice(-3);
            const data = {
                id,
                email: emailUser,
                active: true,
                user: {
                    id,
                    name: firstName,
                    lastName: secondName,
                    birthDate: brithday,
                    password: password
                },
                organization: {
                    companyTitle: organization
                }
            }
            registration(data, admin, res => {
                console.log(res);
            })
            setOpenPop(true);
            setMsg("Пользователь успешно создан")
        }
        checkInputOnError()

    }
    const checkInputOnError = () => {
        if (!firstName) setErrName(true);
        else setErrName(false);
        if (!secondName) setErrLastName(true);
        else setErrLastName(false);
        if (!emailUser) setErrEmail(true);
        else setErrEmail(false);
        if (!password) setErrPassword(true);
        else setErrPassword(false);
        if (admin === "1") setErrRoles(true);
        else setErrRoles(false);
        if (!organization) setErrOrg(true);
        else setErrOrg(false);
        if (!brithday) setErrDate(true);
        else setErrDate(false);
    }
    useEffect(() => {
        if (rolesValue.includes("ROLE_ADMIN")) setAdmin('admin')
        else if (rolesValue.includes("ROLE_USER")) setAdmin("ROLE_USER")
        else setAdmin("1");
        console.log(admin);
    }, [admin, rolesValue])
    const changeArray = (array) => {
        const newArray = array.map(item => ({ text: item.companyTitle, value: item.companyTitle }));
        console.log(newArray);
        setOrgUser([...newArray]);
    }
    const handleOpenModal = () => {
        setOpen(true)
        getOrganizations(res => {
            changeArray(res)
        })
    }


    return (
        <>
            <Button
                floated='right'
                icon='user'
                labelPosition='left'
                primary
                size='small'
                content='Создать пользователя'
                onClick={handleOpenModal}
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
                            <Form.Field >
                                <label>Имя</label>
                                <input placeholder="Введите имя" onChange={e => setFirstName(e.target.value)} />
                                <Error visible={errName} />
                            </Form.Field>
                            <Form.Field>
                                <label>Фамилия</label>
                                <input placeholder="Введите фамилию" onChange={e => setSecondName(e.target.value)} />
                                <Error visible={errLastName} />

                            </Form.Field>
                            <Form.Field>
                                <label>E-mail</label>
                                <input placeholder="Введите e-mail" onChange={(e) => setEmailUser(e.target.value)} type="email" />
                                <Error visible={errEmail} />

                            </Form.Field>
                            <Form.Field>
                                <label>Пароль</label>
                                <input placeholder="Введите пароль" onChange={(e) => setPassword(e.target.value)} type='password' />
                                <Error visible={errPassword} />

                            </Form.Field>
                            <Form.Field>
                                <label>Роль</label>
                                <Dropdown fluid multiple selection placeholder='Выберите роль' options={rolesOptions} onChange={(e, { value }) => setRolesValue(value)} />
                                <Error visible={errRoles} />

                            </Form.Field>
                            <Form.Field>
                                <label>Организация</label>
                                <Dropdown fluid selection placeholder='Выберите организацию' options={orgUser} onChange={(e, { value }) => setOrganization(value)} />
                                <Error visible={errOrg} />

                            </Form.Field>
                            <Form.Field>
                                <label>Дата рождения</label>
                                <input placeholder="Выберите дату вашего рождения" onChange={(e) => setBridthday(e.target.value)} type="date" />
                                <Error visible={errDate} />
                            </Form.Field>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={() => setOpen(false)}>
                            <Icon name='remove' /> Закрыть
                        </Button>
                        <Button positive onClick={handleCreate}>
                            <Icon name='checkmark' /> Сохранить изменения
                        </Button>
                    </Modal.Actions>
                </Modal >
            </Dimmer >
        </>
    )

}

export default CreateUser;
