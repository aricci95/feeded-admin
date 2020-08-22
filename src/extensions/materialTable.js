import React from 'react';
import MaterialTable from 'material-table';
import api from '../API/crudAPI';

export function initTable(name, state, setState, context, extraActions = []) {
    const title = name.charAt(0).toUpperCase() + name.slice(1) + 's'

    return (
        <MaterialTable
            title={title}
            columns={state.columns}
            data={state.data}
            actions={extraActions}
            editable={{
                onRowAdd: (newData) =>
                    new Promise((resolve) => {
                        handleRowAdd(name, newData, state, setState, resolve, context)
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve) => {
                        handleRowUpdate(name, newData, oldData, state, setState, resolve, context)
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                        handleRowDelete(name, oldData, state, setState, resolve, context)
                    }),
            }}
        />
    );
}

export function createList(name, state, setState) {
    api.list(name)
        .then(res => {
            setState({
                columns: state.columns,
                data: res,
            })
        })
}

export function handleRowAdd(name, newData, state, setState, resolve, context) {
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

export function handleRowUpdate(name, newData, oldData, state, setState, resolve, context) {
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

export function handleRowDelete(name, oldData, state, setState, resolve, context) {
    api.remove(name, oldData)
        .then(res => {
            const dataDelete = [...state.data];
            const index = oldData.tableData.id;
            dataDelete.splice(index, 1);
            setState({
                columns: state.columns,
                data: [...dataDelete],
            })
            context.toast('Element supprimé');
            resolve()
        })
        .catch(error => {
            console.log(error)
            resolve()
        })
}

