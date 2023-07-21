<script>
export default {
  globalData: {
    chianItem: {},
    chainIndex: 0
  },

  onLaunch: function () {
    console.log('App Launch')
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
  methods: {
    getChain() {
      return this.globalData.chianItem
    }
  }
}
</script>

<style lang="scss">
/*每个页面公共css */
@import 'common/css/index.scss';
@import 'common/css/demo.scss';
</style>
