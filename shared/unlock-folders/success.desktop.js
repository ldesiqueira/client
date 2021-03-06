// @flow

import React from 'react'
import {globalStyles} from '../styles'
import {Text, Button, Icon} from '../common-adapters'

const PaperKeyInput = ({onClose}: {onClose: () => void}) => (
  <div style={containerStyle}>
    <Icon type='icon-folders-private-success-48' />
    <Text style={successStyle} type='Body'>Success!</Text>
    <Text style={{textAlign: 'center', paddingLeft: 40, paddingRight: 40}} type='Body'>Your paper key is now rekeying folders for this computer. It takes just a couple minutes but lasts forever, like the decision to have a child</Text>
    <Button type='Primary' label='Okay' style={finishStyle} onClick={onClose} />
  </div>
)

const containerStyle = {
  ...globalStyles.flexBoxColumn,
  alignItems: 'center',
  position: 'absolute',
  top: 40,
  left: 0,
  right: 0,
  bottom: 30,
  justifyContent: 'space-between',
}

const successStyle = {
  textAlign: 'center',
}

const finishStyle = {
  marginRight: 30,
  alignSelf: 'flex-end',
}

export default PaperKeyInput
