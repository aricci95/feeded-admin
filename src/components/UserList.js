import React from 'react';
import { initTable, createList } from '../extensions/materialTable'
import ToastContext from '../contexts/toastContext'

export default function UserList(props) {
    const name = 'user'
    const columns = [
        { title: 'Email', field: 'email' },
        { title: 'Prénom', field: 'firstName' },
        { title: 'Nom', field: 'lastName' },
        {
            title: 'Rôle',
            field: 'role',
            lookup: {2: 'Admin', 3: 'Service' },
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

    const context = React.useContext(ToastContext)

    const [state, setState] = React.useState({
        columns,
        data: [],
    });

    React.useEffect(() => {
        createList(name, state, setState, context)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return initTable(name, state, setState, context, extraActions)
    
}