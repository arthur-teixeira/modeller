import React from 'react';
import MaterialTable from 'material-table';
import api from '../../api/axios'

class EditablePipeUsuario extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                {
                    title: 'Pipe',
                    field: 'pipe',
                    lookup: {},
                },
                {
                    title: 'User',
                    field: 'usuario',
                    lookup: {},
                },
            ],
            data: [
            ]
        }
    }

    async getPipes() {
        const response = await api.get('/pipe/listar/');
        let newColumns = this.state.columns;
        let list = '{';
        for (let i = 0; i < response.data.length; i++) {
            if (i != 0) list += ',';
            let a = response.data[i]._id;
            let b = response.data[i].nome;
            list += '"' + a + '" : "' + b + '" ';
        }
        list += '}';
        newColumns[0].lookup = JSON.parse(list);
        this.setState({ columns: newColumns })
    }

    async getUsuarios() {
        const response = await api.get('/usuario/listar/');
        let newColumns = this.state.columns;
        let listUS = '{';
        for (let i = 0; i < response.data.length; i++) {
            if (i != 0) listUS += ',';
            let a = response.data[i]._id;
            let b = response.data[i].login;
            listUS += '"' + a + '" : "' + b + '" ';
        }
        listUS += '}';
        newColumns[1].lookup = JSON.parse(listUS);
        this.setState({ columns: newColumns })
    }

    async componentWillMount() {
        try {
            this.getPipes();
            this.getUsuarios();
            const response = await api.get('/pipe_usuario/listar/');
            this.setState({ data: response.data })
        } catch (error) {
            if (error.response) {
                console.log(error.response.status);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
        }
    }

    async onRowAdd(newData) {
        try {
            if (!newData.pipe) {
                alert('Pipe is required!!!')
                return;
            }
            if (!newData.usuario) {
                alert('User is required!!!')
                return;
            }
            const response = await api.post('/pipe_usuario/inserir/', newData);
            const data = this.state.data;
            data.push(newData);
            this.setState({ data });
        } catch (error) {
            if (error.response) {
                console.log(error.response.status);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
        }
    }

    async onRowUpdate(newData, oldData) {
        try {
            const response = await api.put('/pipe_usuario/atualizar/' + oldData._id, newData);
            const data = this.state.data;
            const index = data.indexOf(oldData);
            data[index] = newData;
            this.setState({ data });
        } catch (error) {
            if (error.response) {
                console.log(error.response.status);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
        }
    }

    async onRowDelete(oldData) {
        try {
            const response = await api.delete('/pipe_usuario/remover/' + oldData._id);
            let data = this.state.data;
            const index = data.indexOf(oldData);
            data.splice(index, 1);
            this.setState({ data });
        } catch (error) {
            if (error.response) {
                console.log(error.response.status);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
        }
    }

    render() {
        return (
            <MaterialTable
                title="Pipes X Users"
                columns={this.state.columns}
                data={this.state.data}
                localization={{
                    body: {
                        addTooltip: 'New',
                        deleteTooltip: 'Remove',
                        editTooltip: 'Edit',
                        emptyDataSourceMessage: 'No register',
                        editRow: {
                            deleteText: 'Confirm remove ?',
                            cancelTooltip: 'Cancel',
                            saveTooltip: 'Save'
                        }
                    },
                    header: {
                        actions: 'Actions'
                    },
                    pagination: {
                        labelDisplayedRows: '{from}-{to} of {count}',
                        labelRowsSelect: 'registers',
                        labelRowsPerPage: 'Registers for page:',
                        firstAriaLabel: 'First',
                        firstTooltip: 'First',
                        previousAriaLabel: 'Prior',
                        previousTooltip: 'Prior',
                        nextAriaLabel: 'Next',
                        nextTooltip: 'Next',
                        lastAriaLabel: 'Last',
                        lastTooltip: 'Last'
                    },
                    toolbar: {
                        exportTitle: 'Export',
                        exportAriaLabel: 'Export',
                        exportName: 'Export CSV',
                        searchTooltip: 'Search',
                        searchPlaceholder: 'Search'
                    }
                }}
                options={{
                    exportButton: true
                }}
                editable={{
                    onRowAdd: newData => this.onRowAdd(newData),
                    onRowUpdate: (newData, oldData) => this.onRowUpdate(newData, oldData),
                    onRowDelete: oldData => this.onRowDelete(oldData),
                }}
            />
        )
    }
}

function PipeUsuario() {
    return (
        <div className="PipeUsuario">
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
            <header className="App-header">
                <EditablePipeUsuario></EditablePipeUsuario>
            </header>
        </div>
    );
}

export default PipeUsuario;
