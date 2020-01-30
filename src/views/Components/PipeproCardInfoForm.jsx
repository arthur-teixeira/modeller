import React from 'react';
//import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10 
  },
  textField: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
    width: 500,
  },
  button: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10      
  }
};

class PipeproCardInfoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { title: '',
                        description: '' };
    }
   

    componentWillReceiveProps =  (props) => {
        this.setState({ title: '', description: ''})
        this.setState(props.card)
    }

    onSaveClose = () => {
        this.props.onCloseCardForm(this.state, true)
    }

    onCancel = () => {
        this.props.onCloseCardForm(this.state, false)
    }

    handleChange = event => {
        const { name, value } = event.target

        this.setState({
          [name]: value,
        })
    }

    render() {
        console.log(this.props.card)
        console.log(this.state)
        return (
            <div>
            <Dialog open={this.props.open} aria-labelledby="form-dialog-title"
                    card={this.props.card} onClose={this.onCancel}>
      
      
    

                        <form className={this.props.classes.container}>
                <TextField
                    placeholder="Title..."
                    name='title'
                    label="Title"
                    className={this.props.classes.textField}
                    value={this.state.title}
                    onChange={this.handleChange}
                    formControlProps={{
                      fullWidth: true
                    }}
                    variant="filled"

                />
                <TextField
                    placeholder="Description..."
                    name='description'
                    label="Description"
                    className={this.props.classes.textField}
                    value={this.state.description}
                    onChange={this.handleChange}
                    formControlProps={{
                      fullWidth: true
                    }}
                    multiline
                    rows="6"
                    variant="filled"

                />
 <Button color="primary" className={this.props.classes.button} onClick={this.onSaveClose}>
        Save
      </Button>
      <Button color="primary" className={this.props.classes.button} onClick={this.onCancel}>
        Cancel
      </Button>
            </form>

        
            </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(PipeproCardInfoForm);