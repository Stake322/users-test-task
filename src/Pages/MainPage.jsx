import React, { useState, useEffect } from 'react'
import { Button, Segment, Table, Pagination } from 'semantic-ui-react'
import CreateUser from '../Components/CreateUser'
import TableHeader from '../Components/TableHeader'
import { getUsers, deleteUser, getAllUsers, editUser } from '../api'
import ModalWindow from '../Components/Modal'
import EditUser from '../Components/EditUser'
const MainPage = () => {
    const [login, setLogin] = useState();
    const [data, setData] = useState();
    const [users, setUsers] = useState([])
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    //placeholder
    //
    const [edit, setEdit] = useState(false)
    const [create, setCreate] = useState(false)
    const [input, setInput] = useState()
    const [open, setOpen] = useState(false)
    const [emailDelete, setEmailDelete] = useState(null);

    const styleSegments = { width: "100%", marginLeft: "auto", marginRight: "auto" }
    //stateForEdit
    const [editData, setEditData] = useState();


    useEffect(() => {
        getUsers(page, result => {
            console.log(result);
            setUsers(result)
        });
        getAllUsers(result => {
            if (result.length) setTotalPages(Math.ceil(result.length / 4)
            );
        })
    }, [page]);

    const onEditUser = (name, lastName, email, roles, organization, id) => {
        setEditData({
            name: name,
            lastName: lastName,
            email: email,
            roles: roles,
            organization: organization,
            id: id
        })
        setEdit(true);
        // editUser({ email: "valera322", id: 322 }, 7778, result => {
        //     console.log(result);
        // })
    }

    const renderUsers = () => {
        return (users !== undefined) ? users.map((value, index) => {
            return (
                <Table.Body key={value.id}>
                    <Table.Row positive={value.favorite}>
                        <Table.Cell collapsing>
                            {index + 1}
                        </Table.Cell>
                        <Table.Cell>{value.user.name}</Table.Cell>
                        <Table.Cell>{value.user.lastName}</Table.Cell>
                        <Table.Cell>{value.email}</Table.Cell>
                        <Table.Cell>
                            {value.roles.map(role => <div key={role.name}> [{role.name}]</div>)}
                        </Table.Cell>
                        <Table.Cell>{value.organization.companyTitle}</Table.Cell>
                        <Table.Cell textAlign='center'><Button icon='download' /></Table.Cell>
                        <Table.Cell textAlign='center'><Button icon='edit' onClick={e => onEditUser(
                            value.user.name,
                            value.user.lastName,
                            value.email,
                            value.roles,
                            value.organization.companyTitle,
                            value.id
                        )} />

                            <Button icon='trash'
                                onClick={(e) => { setOpen(true); setEmailDelete(value.email) }} />
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>

            )
        }) : <></>
    }



    return (
        <>
            <ModalWindow open={open} setOpen={setOpen} emailDelete={emailDelete} />
            <EditUser open={edit} setOpen={setEdit} editData={editData} />
            <Segment raised compact textAlign='center' style={styleSegments}>
                <Table compact celled definition>
                    <TableHeader />
                    {renderUsers()}


                </Table >
                <Pagination
                    defaultActivePage={page}
                    totalPages={totalPages}
                    onPageChange={(e, { activePage }) => setPage(activePage - 1)} />
                <CreateUser open={create} setOpen={setCreate} />
            </Segment>
        </>

    )
}
export default MainPage
