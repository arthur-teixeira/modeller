import React from 'react';
//import './App.css';
import MaterialTable from 'material-table';
import api from '../../api/axios'

class EditableOrganizacao extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                { title: 'Identification', field: 'identificacao' },
                { title: 'Name', field: 'nome' },
                { title: 'Description', field: 'descricao' },
                {
                    title: 'User',
                    field: 'usuario_criacao',
                    lookup: {},
                },
                { title: 'Creation Date', field: 'data_criacao', type: 'date' },
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
        newColumns[3].lookup = JSON.parse(listUS);
        this.setState({ columns: newColumns })
    }

    async componentWillMount() {
        try {
            this.getUsuarios();
            const response = await api.get('/organizacao/listar/');
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
            if (!newData.identificacao) {
                alert('Identification is required!!!')
                return;
            }
            if (!newData.nome) {
                alert('Name is required!!!')
                return;
            }
            if (!newData.descricao) {
                alert('Description is required!!!')
                return;
            }
            if (!newData.usuario_criacao) {
                alert('User is required!!!')
                return;
            }
            if (!newData.data_criacao) {
                let dt = new Date();
                let fdt = dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate()
                newData.data_criacao = fdt.toString();
            }
            const response = await api.post('/organizacao/inserir/', newData);
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
            const response = await api.put('/organizacao/atualizar/' + oldData._id, newData);
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
            const response = await api.delete('/organizacao/remover/' + oldData._id);
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
                title="Organizations"
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

function Organizacao() {
    return (
        <div className="Organizacao">
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
            <header className="App-header">
                <EditableOrganizacao></EditableOrganizacao>
            </header>
        </div>
    );
}

export default Organizacao;
