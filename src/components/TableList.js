import React from 'react';
import { initTable, handleList } from '../extensions/materialTable'

export default function TableList() {
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
        handleList(name, state, setState)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return initTable(name, state, setState)
}