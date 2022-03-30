import React, { useState, useEffect } from 'react'
import { Button, Segment, Table, Pagination } from 'semantic-ui-react'
import AddContact from '../Components/AddContact'
import EditContact from '../Components/EditContact'
import TableHeader from '../Components/TableHeader'
import { getUsers, deleteUser, getAllUsers, editUser } from '../api'
import ModalWindow from '../Components/Modal'
const MainPage = () => {
    const [login, setLogin] = useState();
    const [data, setData] = useState();
    const [users, setUsers] = useState([])
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [valueId, setValueId] = useState();
    //placeholder
    const [placeHolder, setPlaceHolder] = useState("");
    //
    const [edit, setEdit] = useState(false)
    const [input, setInput] = useState()
    const [open, setOpen] = useState(false)
    const [emailDelete, setEmailDelete] = useState(null);

    const styleSegments = { width: "60%", marginLeft: "auto", marginRight: "auto" }


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

    const editUser = () => {

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
                        <Table.Cell textAlign='center'><Button icon='edit' onClick={editUser} />

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
            <Segment raised compact textAlign='center' style={styleSegments}>
                <Table compact celled definition>
                    <TableHeader />
                    {renderUsers()}
                    <AddContact data={data} login={login} />


                </Table >
                <Pagination
                    defaultActivePage={page}
                    totalPages={totalPages}
                    onPageChange={(e, { activePage }) => setPage(activePage - 1)} />
            </Segment>
        </>

    )
}
export default MainPage
