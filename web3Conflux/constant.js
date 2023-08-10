const CHAIN_LIST = [
  {
    name: '树图公链',
    code: 'CONFLUX_MAINNET',
    icon: 'http://dev.confluxos.cfx.art/doc/image/logo.png',
    scan: 'https://confluxscan.net'
  },
  {
    name: '树图测试链',
    code: 'CONFLUX_TESTNET',
    icon: 'http://www.hncfx.com/images/pl1.png',
    scan: 'https://testnet.confluxscan.net'
  },
  {
    name: '树图ESPACE主链',
    code: 'ESPACE_MAINNET',
    icon: 'http://www.hncfx.com/images/ban1.png',
    scan: 'https://api.confluxscan.net'
  },
  {
    name: '树图ESPACE测试链',
    code: 'ESPACE_TESTNET',
    icon: 'http://www.hncfx.com/images/team.jpg',
    scan: 'https://api-testnet.confluxscan.net'
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

// 何剑:
// cfxtest:aajfzr7sdpnea2wv97ajhzc8mc5aw6e9mj4sr09wk5
// 私钥：3ca15c8d280393987d7dc2b8bed04a2456f92a0b364295ee5959d5ff51c48a9b

// 何剑:
// ESPACE测试链
// 0xeB9eE0F249A50B22E2b61AB4C81a51c581C60B89  （有cfx）
// 私钥：66326889af5965d84d55abcaaf99bbc440617c19399b6326d9de27136552cf9b

// 何剑:
// 测试联盟链钱包：0x19034eef6fad0c566ff75793294e6d03ea6f1536
// 私0xc1f69a6fae1d34d6e9b9f578ca2823a30c6aeca5677850a26be798efdf3be87b
// COS联盟链

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
  CONFLUX_TESTNET: 'https://test.confluxrpc.org',
  ESPACE_MAINNET: '	https://evm.confluxrpc.com',
  ESPACE_TESTNET: 'https://evmtestnet.confluxrpc.com',
  CONFLUX_CONSORTIUM_MAINNET: '树图联盟正式链',
  CONFLUX_CONSORTIUM_TESTNET: '树图联盟测试链'
}

const SCAN_URL = {
  CONFLUX_MAINNET: 'https://confluxscan.net',
  CONFLUX_TESTNET: 'https://testnet.confluxscan.net',
  ESPACE_MAINNET: 'https://api.confluxscan.net',
  ESPACE_TESTNET: 'https://api-testnet.confluxscan.net',
  CONFLUX_CONSORTIUM_MAINNET: '树图联盟正式链',
  CONFLUX_CONSORTIUM_TESTNET: '树图联盟测试链'
}

module.exports = {
  CHAIN_URL,
  SCAN_URL,
  CHAIN_LIST,
  CHAIN_HASH
}
