import React from 'react';
import MaterialTable from 'material-table';
import api from '../../api/axios'

class EditablePipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                { title: 'Name', field: 'nome' },
                { title: 'Version', field: 'versao' },
                {
                    title: 'User',
                    field: 'usuarioID',
                    lookup: {},
                },
                {
                    title: 'Organization',
                    field: 'organizacaoID',
                    lookup: {},
                },
                { title: 'Pipe', field: 'pipe' },
            ],
            data: [
            ]
        }
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
        newColumns[2].lookup = JSON.parse(listUS);
        this.setState({ columns: newColumns })
    }

    async getOrganizacoes() {
        const response = await api.get('/organizacao/listar/');
        let newColumns = this.state.columns;
        let listOR = '{';
        for (let i = 0; i < response.data.length; i++) {
            if (i != 0) listOR += ',';
            let a = response.data[i]._id;
            let b = response.data[i].nome;
            listOR += '"' + a + '" : "' + b + '" ';
        }
        listOR += '}';
        newColumns[3].lookup = JSON.parse(listOR);
        this.setState({ columns: newColumns })
    }

    async componentWillMount() {
        try {
            this.getUsuarios();
            this.getOrganizacoes();
            const response = await api.get('/pipe/listar/');
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
            if (!newData.nome) {
                alert('Name is required!!!')
                return;
            }
            if (!newData.versao) {
                alert('Version is required!!!')
                return;
            }
            if (!newData.usuarioID) {
                alert('User is required!!!')
                return;
            }
            if (!newData.organizacaoID) {
                alert('Organization is required!!!')
                return;
            }
            if (!newData.pipe) {
                alert('Pipe is required!!!')
                return;
            }
            const response = await api.post('/pipe/inserir/', newData);
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
            const response = await api.put('/pipe/atualizar/' + oldData._id, newData);
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
            const response = await api.delete('/pipe/remover/' + oldData._id);
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
                title="Pipes"
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

function Pipe() {
    return (
        <div className="Pipe">
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
            <header className="App-header">
                <EditablePipe></EditablePipe>
            </header>
        </div>
    );
}

export default Pipe;
