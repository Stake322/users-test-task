import React, { useState, useEffect } from 'react'

import { Table, Button } from 'semantic-ui-react'

const TableHeader = ({ users, setUsers }) => {



    const [sortType, setSortType] = useState('id');

    useEffect(() => {
        const sortArray = type => {
            const types = {
                email: 'email',
                id: 'id',
                name: "name",
                lastName: "lastName",
                roles: "roles",
                organization: "organization"
            };
            const sortProperty = types[type];
            //bad code, need work around this
            if (users.length) {
                if (sortProperty === "email" || sortProperty === "id") {
                    const sorted = [...users].sort((a, b) => (b[sortProperty] < a[sortProperty]) ? 1 : -1);
                    setUsers(sorted)
                } else if (sortProperty === "name") {
                    const sortedUsersName = [...users].sort((a, b) => ((a.user["name"].toLowerCase() > b.user["name"].toLowerCase()) ? 1 : -1));
                    setUsers(sortedUsersName)
                } else if (sortProperty === "lastName") {
                    const sortedUsersLastName = [...users].sort((a, b) => ((a.user["lastName"].toLowerCase() > b.user["lastName"].toLowerCase()) ? 1 : -1));
                    setUsers(sortedUsersLastName)
                } else if (sortProperty === "organization") {
                    const sortedDeepArrayCompanyTitle = [...users].sort((a, b) => ((a.organization["companyTitle"].toLowerCase() > b.organization["companyTitle"].toLowerCase()) ? 1 : -1));
                    setUsers(sortedDeepArrayCompanyTitle)
                } else if (sortProperty === "roles") {
                    const sortRoles = [...users].sort((a, b) => (a.roles.length < b.roles.length) ? 1 : -1);
                    setUsers(sortRoles);
                }
            }
        };
        sortArray(sortType);
    }, [sortType]);

    return (

        <Table.Header>
            <Table.Row>
                <Table.HeaderCell />
                <Table.HeaderCell onClick={() => setSortType("name")} >Имя</Table.HeaderCell>
                <Table.HeaderCell onClick={() => setSortType("lastName")}> Фамилия</Table.HeaderCell>
                <Table.HeaderCell onClick={() => setSortType("email")}>E-mail</Table.HeaderCell>
                <Table.HeaderCell onClick={() => setSortType("roles")}>Роль</Table.HeaderCell>
                <Table.HeaderCell onClick={() => setSortType("organization")}> Организация</Table.HeaderCell>
                <Table.HeaderCell>Изображения</Table.HeaderCell>
                <Table.HeaderCell>Действие</Table.HeaderCell>
            </Table.Row>

        </Table.Header >

    )
}

export default TableHeader;
