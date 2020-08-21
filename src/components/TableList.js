import React from 'react';
import { initTable, createList } from '../extensions/materialTable'
import ToastContext from '../contexts/toastContext'

export default function TableList() {
    const context = React.useContext(ToastContext)

    const name = 'table'
    const columns = [
        { title: 'Numéro', field: 'number', type: 'numeric' },
        { title: 'Places', field: 'slots', type: 'numeric' },
    ]

    const [state, setState] = React.useState({
        columns: columns,
        data: [],
    });

    React.useEffect(() => {
        createList(name, state, setState, context)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return initTable(name, state, setState, context)
}