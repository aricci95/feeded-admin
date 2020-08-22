import React from 'react';
import { initTable, createList } from '../extensions/materialTable'
import ToastContext from '../contexts/toastContext'

export default function FoodList() {
    const name = 'Food'
    const columns = [
        { title: 'Libellé', field: 'label', type: 'string' },
        {
            title: 'Type',
            field: 'type',
            lookup: { Starter: 'Entrée', Plat: 'Plat', Dessert: 'Dessert', Drink: 'Boisson' },
        },
        { 
            title: 'Prix',
            field: 'price',
            type: 'numeric',
        },
    ]

    const [state, setState] = React.useState({
        columns: columns,
        data: [],
    });

    const context = React.useContext(ToastContext)

    React.useEffect(() => {
        createList(name, state, setState, context)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return initTable(name, state, setState, context)
}