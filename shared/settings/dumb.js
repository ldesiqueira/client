// @flow

import React from 'react'
import {Box, Text} from '../common-adapters'

import UpdateEmail from './email'
import Landing from './landing'
import SettingsNav from './nav'

import type {DumbComponentMap} from '../constants/types/more'

const updateEmailBase = {
  email: 'party@mypla.ce',
  isVerified: true,
  onChangeEmail: () => console.log('onChangeEmail'),
  onSave: () => console.log('onSave'),
  onResendConfirmationCode: null,
}

const updateEmailMap: DumbComponentMap<UpdateEmail> = {
  component: UpdateEmail,
  mocks: {
    'Normal': updateEmailBase,
    'Normal - No Email': {
      ...updateEmailBase,
      isVerified: false,
      email: null,
    },
    'Not Verified - No Email': {
      ...updateEmailBase,
      isVerified: false,
    },
    'Resend Confirmation': {
      ...updateEmailBase,
      onResendConfirmationCode: () => console.log('onResendConfirmationCode'),
    },
  },
}

const planBase = {
  onUpgrade: l => console.log('onUpgrade to', l),
  onDowngrade: l => console.log('onDowngrade to', l),
  onInfo: l => console.log('onInfo for', l),
  selectedLevel: 'Basic',
  freeSpace: '5GB',
  freeSpacePercentage: 0.5,
  lowSpaceWarning: false,
  onChangePaymentInfo: () => console.log('onChangePaymentInfo'),
  paymentInfo: null,
}

const accountBase = {
  email: 'party@mypla.ce',
  isVerified: true,
  onChangeEmail: () => console.log('onChangeEmail'),
  onChangePassphrase: () => console.log('onChangePassphrase'),
}

const landingBase = {
  plan: planBase,
  account: accountBase,
}

const goldBase = {
  ...landingBase,
  plan: {
    ...planBase,
    selectedLevel: 'Gold',
    lowSpaceWarning: true,
    freeSpacePercentage: 0.9,
    paymentInfo: {
      name: 'Jessica Jones',
      last4Digits: '1337',
      isBroken: false,
    },
  },
}

const landingMap: DumbComponentMap<Landing> = {
  component: Landing,
  mocks: {
    'Normal': landingBase,
    'Normal - Not Verified email': {...landingBase, account: {...landingBase.account, isVerified: false}},
    'Gold Plan': goldBase,
    'Gold Plan - Broken Payment': {
      ...goldBase,
      plan: {
        ...goldBase.plan,
        paymentInfo: {
          ...goldBase.plan.paymentInfo,
          isBroken: true,
        },
      },
    },
  },
}

const fillerContent = <Box style={{flex: 1, backgroundColor: 'grey'}} />

const settingsNavBase = {
  content: fillerContent,
  items: [{
    text: 'Your Account',
    onClick: () => { console.log('clicked your account') },
    badgeNumber: 1,
    selected: true,
  }, {
    text: 'Invitations (15)',
    onClick: () => { console.log('clicked ivites') },
  }, {
    text: 'Notifications',
    onClick: () => { console.log('clicked notifications') },
  }, {
    text: 'Delete me',
    onClick: () => { console.log('clicked delete me') },
  }],
}

const bannerTextStyle = {
  alignSelf: 'center',
  textAlign: 'center',
  flex: 1,
}

const settingsNavMap: DumbComponentMap<SettingsNav> = {
  component: SettingsNav,
  mocks: {
    'Normal': settingsNavBase,
    'Normal - Good Banner': {
      ...settingsNavBase,
      bannerElement: <Text type='BodySmallSemibold' style={bannerTextStyle} backgroundMode='Success'>Success! You have just upgraded to the Gold plan. </Text>,
      bannerType: 'green',
    },
    'Normal - Bad Banner': {
      ...settingsNavBase,
      bannerElement: <Text type='BodySmallSemibold' style={bannerTextStyle} backgroundMode='HighRisk'>Your Visa **** 4242 has broken. Please update your preferred payment method.</Text>,
      bannerType: 'red',
    },
  },
}

export default {
  UpdateEmail: updateEmailMap,
  Landing: landingMap,
  SettingsNav: settingsNavMap,
}
