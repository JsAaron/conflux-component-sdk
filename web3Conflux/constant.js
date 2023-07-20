const CHAIN_LIST = [
  {
    name: '树图公链',
    code: 'CONFLUX_MAINNET',
    icon: 'http://dev.confluxos.cfx.art/doc/image/logo.png'
  },
  {
    name: '树图测试链',
    code: 'CONFLUX_TESTNET',
    icon: 'http://www.hncfx.com/images/pl1.png'
  },
  {
    name: '树图ESPACE主链',
    code: 'ESPACE_MAINNET',
    icon: 'http://www.hncfx.com/images/ban1.png'
  },
  {
    name: '树图ESPACE测试链',
    code: 'ESPACE_TESTNET',
    icon: 'http://www.hncfx.com/images/team.jpg'
  },
  {
    name: '树图联盟正式链',
    code: 'CONFLUX_CONSORTIUM_MAINNET',
    icon: 'http://www.hncfx.com/images/js.png'
  },
  {
    name: '树图联盟测试链',
    code: 'CONFLUX_CONSORTIUM_TESTNET',
    icon: 'http://www.hncfx.com/images/Android.png'
  }
]

const CHAIN_HASH = {
  CONFLUX_MAINNET: '树图公链',
  CONFLUX_TESTNET: '树图测试链',
  ESPACE_MAINNET: '树图ESPACE主链',
  ESPACE_TESTNET: '树图ESPACE测试链',
  CONFLUX_CONSORTIUM_MAINNET: '树图联盟正式链',
  CONFLUX_CONSORTIUM_TESTNET: '树图联盟测试链'
}

const CHAIN_URL = {
  CONFLUX_MAINNET: 'https://main.confluxrpc.com',
  CONFLUX_TESTNET: 'http://test.confluxrpc.org/v2',
  ESPACE_MAINNET: '	https://main.confluxrpc.org',
  ESPACE_TESTNET: 'https://test.confluxrpc.org',
  CONFLUX_CONSORTIUM_MAINNET: '树图联盟正式链',
  CONFLUX_CONSORTIUM_TESTNET: '树图联盟测试链'
}

module.exports = {
  CHAIN_URL,
  CHAIN_LIST,
  CHAIN_HASH
}
