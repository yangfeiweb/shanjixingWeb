<template>
    <div class="main-header cnfont">
        <div class="main-nav-header-left">
            <div class="nav-img">
                <img  v-if="srcPath" class="srcPath" src="srcPath"  alt="">
                 <slot v-else name='srcPath'></slot>
            </div>
            <ul>
                <li>
                    <span v-if="mobile" class="mobile"> {{mobile}}</span>
                    <slot v-else name='mobile'></slot>
                </li>
                <li>VIP有效期：
                    <span v-if="number" class="number">{{number}}</span>
                    <slot v-else name='number'></slot>天
                </li>
            </ul>
        </div>
        <div class="nav-header-title">
            <span v-if="title" class="title">{{title}}</span>
            <slot v-else name='title'></slot>
        </div>
    </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String
    },
    number: {
      type: String
    },
    mobile: {
      type: String
    },
    srcPath:{
        type:String
    }
  }
};
</script>

<style lang="scss" scoped>
.main-header {
  position: relative;
  box-sizing: border-box;
  height: 70px;
  //   line-height: 70px;
  font-size: 18px;
  background: linear-gradient(to right, #25a9fe, #06e1ff);
  background: -webkit-linear-gradient(to right, #25a9fe, #06e1ff);
  background: -o-linear-gradient(to right, #25a9fe, #06e1ff);
  background: -moz-linear-gradient(to right, #25a9fe, #06e1ff);
  .main-nav-header-left {
    position: absolute;
    height: 100%;
    z-index: 2;
    .nav-img {
      float: left;
      width: 50px;
      line-height: 70px;
      height: 70px;
      margin-left: 10px;
      img {
        width: 100%;
        vertical-align: middle;
        border-radius: 50%;
      }
    }
    ul {
      list-style: none;
      float: left;
      font-size: 14px;
      color: #ffffff;
      li {
        margin-left: 10px;
        padding-top: 13px;
      }
    }
  }
  .nav-header-title {
    position: absolute;
    color: #ffffff;
    margin: 0 auto;
    width: 100%;
    line-height: 70px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
