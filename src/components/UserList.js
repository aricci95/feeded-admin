import React from 'react';
import { initTable, handleList } from '../extensions/materialTable'

export default function UserList(props) {
    const name = 'user'
    const columns = [
        { title: 'Email', field: 'email' },
        { title: 'Prénom', field: 'firstName' },
        { title: 'Nom', field: 'lastName' },
        {
            title: 'Rôle',
            field: 'role',
            lookup: { ADMIN: 'ADMIN', WAITER: 'WAITER' },
        },
    ];
    const extraActions = [
        {
            icon: 'vpn_key',
            tooltip: 'Modifier le mot de passe',
            onClick: (event, rowData) => {
                props.onClick(rowData)
            }
        }
    ]

    const [state, setState] = React.useState({
        columns,
        data: [],
    });

    React.useEffect(() => {
        handleList(name, state, setState)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return initTable(name, state, setState, extraActions)
    
}