import React, { useState, useEffect } from 'react'
import { Button, Segment, Table, Pagination, Image } from 'semantic-ui-react'
import CreateUser from '../Components/CreateUser'
import TableHeader from '../Components/TableHeader'
import { getUsers, getAllUsers, getArch } from '../api'
import ModalWindow from '../Components/Modal'
import EditUser from '../Components/EditUser'
import { saveAs } from 'file-saver'
import Popup from '../Components/Popup'
const MainPage = () => {
    const [users, setUsers] = useState([])
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [edit, setEdit] = useState(false)
    const [create, setCreate] = useState(false)
    const [open, setOpen] = useState(false)
    const [emailDelete, setEmailDelete] = useState(null);
    const [openPop, setOpenPop] = useState(false);
    const [msg, setMsg] = useState(false);
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

    }
    const onDownload = (id) => {
        getArch(id, res => {
            saveAs(res.image, `image${id}.jpg`)
            setOpenPop(true);
            setMsg("Изображение успешно загрузилось")
        })

    };


    //sort


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
                        <Table.Cell textAlign='center'><Button icon='download' onClick={e => onDownload(value.id)} /></Table.Cell>
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
            <Popup open={openPop} setOpen={setOpenPop} info={msg} />
            <ModalWindow open={open} setOpen={setOpen} emailDelete={emailDelete} />
            <EditUser open={edit} setOpen={setEdit} editData={editData} setOpenPop={setOpenPop} setMsg={setMsg} />
            <Segment raised compact textAlign='center' style={styleSegments}>
                <Table compact celled definition sortable >
                    <TableHeader setUsers={setUsers} users={users} />
                    {renderUsers()}
                </Table >
                <Pagination
                    defaultActivePage={page}
                    totalPages={totalPages}
                    onPageChange={(e, { activePage }) => setPage(activePage - 1)} />
                <CreateUser open={create} setOpen={setCreate} renderUsers={renderUsers} setOpenPop={setOpenPop} setMsg={setMsg} />

            </Segment>
        </>

    )
}
export default MainPage
