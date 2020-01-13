import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import api from "../../api/axios.js";
import PropTypes from 'prop-types';

const useStyles = theme => ({
    card: {
        maxWidth: 200,
        margin: '10px'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

class SimpleCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            processos: [],
            name: ""
        };
    }

    async componentDidMount() {
        this.listProcess();
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleChangeName = event => {
        const { value } = event.target;
        this.setState({ name: value });
    };

    async listProcess() {
        const response = await api.get('/pipe/listar/');
        this.setState({
            processos: response.data,
            open: false
        });
    }

    async removeProcess(id) {
        const response = await api.delete('/pipe/remover/' + id);
        console.log(response.data);
        this.listProcess();
    }

    async insertProcess() {
        const response = await api.post('/pipe/inserir/', {
            nome: this.state.name,
            versao: '1.0',
            usuarioID: '5d629644dc1cd73d4c596069',
            processo: '{"lanes": []}'
        });
        console.log(response.data);
        this.listProcess();
    }

    render() {
        const { classes } = this.props;
        const listProcessos = this.state.processos.map((proc) =>
            <div key={proc._id} >
                <Card className={classes.card} color="blue" >
                    <CardContent color="blue">
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            {proc.nome}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Link to={'/admin/pipepro/' + proc._id} ><Button onClick="" size="small">Open</Button></Link>
                        <Button onClick={this.removeProcess.bind(this, proc._id)} size="small">Remove</Button>
                    </CardActions>
                </Card>
            </div>
        );
        return (
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                {listProcessos}
                <Card className={classes.card}>
                    <CardContent>
                    </CardContent>
                    <CardActions>
                        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title">New Pipe</DialogTitle>
                            <DialogContent>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Name"
                                    type="text"
                                    fullWidth
                                    value={this.state.name}
                                    onChange={this.handleChangeName}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.handleClose} color="primary">
                                    Cancel
                    </Button>
                                <Button onClick={this.insertProcess.bind(this)} color="primary">
                                    Save
                    </Button>
                            </DialogActions>
                        </Dialog>
                        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>New</Button>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

SimpleCard.propTypes = {
    classes: PropTypes.object.isRequired
}
export default withStyles(useStyles)(SimpleCard);




