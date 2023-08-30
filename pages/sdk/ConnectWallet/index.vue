<template>
  <view class="u-demo">
    <view class="btn-box">
      <cfx-button @click="onConnectWallet" type="primary">链接钱包</cfx-button>
      <view style="height: 20rpx"></view>
      <cfx-button @click="onSendTransaction" type="primary">发送交易</cfx-button>
      <view style="height: 20rpx"></view>
      <!-- <cfx-connect-wallet chainCode="CONFLUX_MAINNET" v-model="show1"></cfx-connect-wallet>
      <cfx-connect-wallet chainCode="all" v-model="show2"></cfx-connect-wallet> -->
      <view>{{ currentAccount }}</view>
    </view>
  </view>
</template>

<script>
import detectProvider from '@fluent-wallet/detect-provider'
import { Conflux, Drip } from '../../../web3Conflux/sdk/js-conflux-sdk'
export default {
  data() {
    return {
      currentAccount: '',
      show1: false,
      show2: false
    }
  },

  async onLoad() {
    const provider = await detectProvider({
      injectFlag: 'conflux',
      defaultWalletFlag: 'isFluent'
    })
    if (provider) {
      startApp(provider)
    } else {
      this.$api.msg.error('Please install Fluent Wallet!')
    }
    function startApp(provider) {
      if (provider !== window.conflux) {
        this.$api.msg.error('Do you have multiple wallets installed?')
      }
    }

    /**********************************************************/
    /* Handle chain (network) and chainChanged (per EIP-1193) */
    /**********************************************************/

    const chainId = await window.conflux.request({ method: 'cfx_chainId' })

    window.conflux.on('chainChanged', handleChainChanged)

    function handleChainChanged(chainId) {
      window.location.reload()
    }

    /***********************************************************/
    /* Handle user accounts and accountsChanged (per EIP-1193) */
    /***********************************************************/

    window.conflux
      .request({ method: 'cfx_accounts' })
      .then(this.handleAccountsChanged)
      .catch(err => {
        console.error(err)
      })

    window.conflux.on('accountsChanged', this.handleAccountsChanged)
  },

  methods: {
    async handleAccountsChanged(accounts) {
      if (accounts.length === 0) {
        console.log('Please connect to Fluent Wallet.')
      } else if (accounts[0] !== this.currentAccount) {
        this.currentAccount = accounts[0]
      }
    },

    async onConnectWallet() {
      const accounts = await window.conflux.request({ method: 'cfx_requestAccounts' }).catch(err => {
        if (err.code === 4001) {
          console.log('Please connect to Fluent Wallet.')
        } else {
          console.error(err)
        }
      })
      const account = accounts[0]
      this.currentAccount = account
    },

    onSendTransaction() {
      window.conflux
        .request({
          method: 'cfx_sendTransaction',
          params: [
            {
              from: this.currentAccount,
              to: 'cfxtest:aapsg504u369zzxjkmu8h7c80dpzs1155u8r147y3m',
              gas: '0x5208', // 21000
              gasPrice: '0x7530', // 30000
              value: '0x1'
            }
          ]
        })
        .then(txHash => console.log(txHash))
        .catch(error => console.error(error))
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-box {
  display: flex;
  flex-direction: column;
}
</style>
