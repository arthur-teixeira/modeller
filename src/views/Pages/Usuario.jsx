import React from 'react';
//import './App.css';
import MaterialTable from 'material-table';
import api from '../../api/axios'
//import firebase from "firebaseConfig";

class EditableUsuario extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                { title: 'Login', field: 'login' },
                { title: 'Name', field: 'nome' },
            ],
            data: [
            ]
        }
    }

    async componentWillMount() {
        try {
            //this.getUsuarios();
            const response = await api.get('/usuario/listar/');
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
            if (!newData.login) {
                alert('Login is required!!!')
                return;
            }
            if (!newData.nome) {
                alert('Name is required!!!')
                return;
            }
            const response = await api.post('/usuario/inserir/', newData);
            const data = this.state.data;
            data.push(newData);
            this.setState({ data });


            // firebase.auth().createUserWithEmailAndPassword(newData.login, '').then(function (user) {
            // then() function is used to know when the async call has ended
            // that way, we can notify our reducers that register was succesful

            // we take the user id and it's name and we add it in our
            // user-details table
            //userDetailsRef.push().set({ userId: user.user.uid, userName: name });
            // let userActive = firebase.auth().getCurrentUser();
            //   firebase.auth().currentUser.sendEmailVerification();
            //firebase.auth().signOut();
            // register was succesful by sending true
            //dispatch({ type: "register", payload: false });
            //dispatch({ type: "login", payload: false });

            // window.location.replace("/auth/login-page");


            // if the register was not succesful we can catch the erros here
            //  }).catch(function (error) { // if we have any erros, we'll throw an allert with that error
            //    alert(error);
            //  });




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
            const response = await api.put('/usuario/atualizar/' + oldData._id, newData);
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
            const response = await api.delete('/usuario/remover/' + oldData._id);
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
                title="Users"
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

function Usuario() {
    return (
        <div className="Usuario">
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
            <header className="App-header">
                <EditableUsuario></EditableUsuario>
            </header>
        </div>
    );
}

export default Usuario;
