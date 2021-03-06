// @flow
import React, {Component} from 'react'
import type {IconType} from '../common-adapters/icon'
import type {Props} from './render'
import {Box, Text, PopupMenu, Icon, ClickableBox, NativeScrollView} from '../common-adapters/index.native'
import {globalStyles, globalColors} from '../styles'

const DeviceRow = ({device, revoked, showRemoveDevicePage, showExistingDevicePage}) => {
  const icon: IconType = {
    'mobile': 'icon-phone-bw-48',
    'desktop': 'icon-computer-bw-48',
    'backup': 'icon-paper-key-48',
  }[device.type]

  let textStyle = {fontStyle: 'italic', flex: 0}
  if (revoked) {
    textStyle = {
      ...textStyle,
      color: globalColors.black_40,
      textDecorationLine: 'line-through',
      textDecorationStyle: 'solid',
    }
  }

  return (
    <ClickableBox onClick={() => showExistingDevicePage(device)} style={{...stylesCommonRow, alignItems: 'center', ...(revoked ? {backgroundColor: globalColors.white_40} : {})}}>
      <Box key={device.name} style={{...globalStyles.flexBoxRow, flex: 1, alignItems: 'center'}}>
        <Icon type={icon} style={revoked ? {marginRight: 16, opacity: 0.2} : {marginRight: 16}} />
        <Box style={{...globalStyles.flexBoxColumn, justifyContent: 'flex-start', flex: 1}}>
          <Text style={textStyle} type='BodySemibold'>{device.name}</Text>
          {device.currentDevice && <Text type='BodySmall'>Current device</Text>}
        </Box>
        <ClickableBox onClick={() => showRemoveDevicePage(device)}>
          <Box>{!revoked && <Text style={{color: globalColors.red, paddingLeft: 16}} type='BodyPrimaryLink'>Revoke</Text>}</Box>
        </ClickableBox>
      </Box>
    </ClickableBox>
  )
}

const RevokedDescription = () => (
  <Box style={stylesRevokedDescription}>
    <Text type='BodySmallSemibold' style={{color: globalColors.black_40, textAlign: 'center'}}>Revoked devices will no longer be able to access your Keybase account.</Text>
  </Box>
)

type RevokedHeaderState = {expanded: boolean}
class RevokedDevices extends Component<void, {revokedDevices: Array<Object>}, RevokedHeaderState> {
  state: RevokedHeaderState;

  constructor (props: Props) {
    super(props)
    this.state = {expanded: false}
  }

  _toggleHeader (e) {
    this.setState({expanded: !this.state.expanded})
  }

  render () {
    if (!this.props.revokedDevices) {
      return null
    }

    const iconType = this.state.expanded ? 'iconfont-caret-down' : 'iconfont-caret-right'

    return (
      <Box>
        <ClickableBox onClick={e => this._toggleHeader(e)}>
          <Box style={stylesRevokedRow}>
            <Text type='BodySemibold'>Revoked devices</Text>
            <Icon type={iconType} style={{padding: 5}} />
          </Box>
        </ClickableBox>
        {this.state.expanded && <RevokedDescription />}
        {this.state.expanded && this.props.revokedDevices.map(device => <DeviceRow key={device.name} device={device} revoked={true} />)}
      </Box>)
  }
}

const DeviceHeader = ({onAddNew}) => (
  <ClickableBox onClick={onAddNew}>
    <Box style={{...stylesCommonRow, alignItems: 'center'}}>
      <Icon type='icon-devices-add-64-x-48' style={{padding: 5}} />
      <Text type='BodyPrimaryLink' style={{padding: 5}}>Add new...</Text>
    </Box>
  </ClickableBox>
)

type State = {
  menuVisible: boolean,
}
class Render extends Component<void, Props, State> {
  state: State;

  constructor (props: Props) {
    super(props)
    this.state = {menuVisible: false}
  }

  render () {
    const items = [
      {title: 'New Phone', onClick: () => this.props.addNewPhone()},
      {title: 'New Computer', onClick: () => this.props.addNewComputer()},
      {title: 'New Paper Key', onClick: () => this.props.addNewPaperKey()},
    ]
    return (
      <Box style={stylesContainer}>
        <DeviceHeader onAddNew={() => this.setState({menuVisible: true})} />
        <NativeScrollView style={{...globalStyles.flexBoxColumn, flex: 1}}>
          {this.props.devices && this.props.devices.map(device =>
            <DeviceRow
              key={device.name}
              device={device}
              showRemoveDevicePage={this.props.showRemoveDevicePage}
              showExistingDevicePage={this.props.showExistingDevicePage} />)}
          <RevokedDevices revokedDevices={this.props.revokedDevices} />
        </NativeScrollView>
        {this.state.menuVisible && <PopupMenu items={items} onHidden={() => this.setState({menuVisible: false})} />}
      </Box>
    )
  }
}

const stylesContainer = {
  ...globalStyles.flexBoxColumn,
  flex: 1,
}

const stylesCommonCore = {
  borderBottomColor: globalColors.black_10,
  borderBottomWidth: 1,
  alignItems: 'center',
  justifyContent: 'center',
}

const stylesCommonRow = {
  ...globalStyles.flexBoxRow,
  ...stylesCommonCore,
  padding: 8,
  minHeight: 64,
}

const stylesRevokedRow = {
  ...globalStyles.flexBoxRow,
  alignItems: 'center',
  paddingLeft: 8,
  minHeight: 38,
  justifyContent: 'flex-start',
  backgroundColor: globalColors.lightGrey,
}

const stylesRevokedDescription = {
  ...globalStyles.flexBoxColumn,
  ...stylesCommonCore,
  alignItems: 'center',
  paddingLeft: 32,
  paddingRight: 32,
  backgroundColor: globalColors.lightGrey,
}

export default Render
