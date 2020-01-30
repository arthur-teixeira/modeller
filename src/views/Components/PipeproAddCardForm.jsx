import React, {Component} from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField';

import {
  CardForm,
  CardHeader,
  CardRightContent,
  CardTitle,
  CardWrapper,
  Detail
} from 'react-trello/src/styles/Base'
import {AddButton, CancelButton} from 'react-trello/src/styles/Elements'

class PipeproAddCardForm extends Component {
  updateField = (field, value) => {
    this.setState({[field]: value.target.value})
  }

  handleAdd = () => {
    this.props.onAdd(this.state)
  } 

  render() {
    const {onCancel, t} = this.props
    return (
      <CardForm>
        <CardWrapper>
          <CardHeader>
            <CardTitle>
              <TextField placeholder={t('placeholder.title')} onChange={val => this.updateField('title', val)} autoFocus />
            </CardTitle>
{/*}            <CardRightContent>
              <TextField placeholder={t('placeholder.label')} onChange={val => this.updateField('teste', val)} />
    </CardRightContent>*/}
          </CardHeader>
{/*          <Detail>
            <TextField placeholder={t('placeholder.description')} onChange={val => this.updateField('description', val)} />
    </Detail>*/}
        </CardWrapper>
        <AddButton onClick={this.handleAdd}>{t('button.Add card')}</AddButton>
        <CancelButton onClick={onCancel}>{t('button.Cancel')}</CancelButton>
      </CardForm>
    )
  }
}

PipeproAddCardForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

PipeproAddCardForm.defaultProps = {
}

export default PipeproAddCardForm