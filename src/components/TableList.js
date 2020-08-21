import React from 'react';
import MaterialTable from 'material-table';
import { list, create, edit, remove } from '../API/tableAPI';

export default function TableList() {
    const [state, setState] = React.useState({
        columns: [
            { title: 'Numéro', field: 'number' },
            { title: 'Places', field: 'slots' },
        ],
        data: [],
    });

    // Load data list
    React.useEffect(() => {
        list()
            .then(res => {
                setState({
                    columns: state.columns,
                    data: res,
                })
            })
    }, [])

    const handleRowAdd = (newData, resolve) => {
        let errorList = []
        if (newData.number === undefined) {
            errorList.push("Vous devez renseigner le numéro")
            resolve()
        }
        if (newData.slots === undefined) {
            errorList.push("Vous devez renseigner le nombre de places")
            resolve()
        }
        if (errorList.length < 1) { //no error
            create(newData)
                .then(res => {
                    let dataToAdd = [...state.data, newData];
                    setState({
                        columns: state.columns,
                        data: dataToAdd,
                    })
                    resolve()
                })
                .catch(error => {
                    console.log(error)
                    resolve()
                })
        }
    }

    const handleRowUpdate = (newData, oldData, resolve) => {
        let errorList = []
        if (newData.number === undefined) {
            errorList.push("Vous devez renseigner le numéro")
            resolve()
        }
        if (newData.slots === undefined) {
            errorList.push("Vous devez renseigner le nombre de places")
            resolve()
        }
        if (errorList.length < 1) {
            edit(newData)
                .then(res => {
                    const dataUpdate = [...state.data];
                    const index = oldData.tableData.id;
                    dataUpdate[index] = newData;

                    setState({
                        columns: state.columns,
                        data: [...dataUpdate],
                    })
                })
                .catch(error => {
                    console.log(error)
                    resolve()
                })
        }
        resolve()
    }

    const handleRowDelete = (oldData, resolve) => {
        remove(oldData)
            .then(res => {
                const dataDelete = [...state.data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setState({
                    columns: state.columns,
                    data: [...dataDelete],
                })
                resolve()
            })
            .catch(error => {
                resolve()
            })
    }

    return (
        <MaterialTable
            title="Tables"
            columns={state.columns}
            data={state.data}
            editable={{
                onRowAdd: (newData) =>
                    new Promise((resolve) => {
                        handleRowAdd(newData, resolve)
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve) => {
                        handleRowUpdate(newData, oldData, resolve);
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                        handleRowDelete(oldData, resolve)
                    }),
            }}
        />
    );
}