import React from 'react';
import MaterialTable from 'material-table';
import api from '../API/crudAPI';

export function initTable(name, state, setState, extraActions = []) {
    return (
        <MaterialTable
            title={name}
            columns={state.columns}
            data={state.data}
            actions={extraActions}
            editable={{
                onRowAdd: (newData) =>
                    new Promise((resolve) => {
                        handleRowAdd(name, newData, state, setState, resolve)
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve) => {
                        handleRowUpdate(name, newData, oldData, state, setState, resolve)
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                        handleRowDelete(name, oldData, state, setState, resolve)
                    }),
            }}
        />
    );
}

export function handleList(name, state, setState) {
    api.list(name)
        .then(res => {
            setState({
                columns: state.columns,
                data: res,
            })
        })
}

export function handleRowAdd(name, newData, state, setState, resolve) {
    api.create(name, newData)
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

export function handleRowUpdate(name, newData, oldData, state, setState, resolve) {
    api.edit(name, newData)
        .then(res => {
            const dataUpdate = [...state.data];
            const index = oldData.tableData.id;
            dataUpdate[index] = newData;

            setState({
                columns: state.columns,
                data: [...dataUpdate],
            })
            resolve()
        })
        .catch(error => {
            console.log(error)
            resolve()
        })
}

export function handleRowDelete(name, oldData, state, setState, resolve) {
    api.remove(name, oldData)
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
            console.log(error)
            resolve()
        })
}

