import React from 'react'
import { Table } from 'semantic-ui-react'

const TableHeader = () => (
    <Table.Header>
        <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell>Имя</Table.HeaderCell>
            <Table.HeaderCell>Фамилия</Table.HeaderCell>
            <Table.HeaderCell>E-mail</Table.HeaderCell>
            <Table.HeaderCell>Роль</Table.HeaderCell>
            <Table.HeaderCell>Организация</Table.HeaderCell>
            <Table.HeaderCell>Изображения</Table.HeaderCell>
            <Table.HeaderCell>Действие</Table.HeaderCell>
        </Table.Row>
    </Table.Header>
)

export default TableHeader;
