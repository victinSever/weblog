<template>
  <div class="root">
    <vue-particles
      color="#1e80ff"
      :particleOpacity="0.7"
      :particleNumber="150"
      shapeType="circle"
      :particleSize="4"
      lineColor="#fff"
      :lineWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :lineDistance="150"
      :moveSpeed="3"
      hoverMode="grab"
      :clickEffect="false"
      clickMode="push"
      class="lizi"
    ></vue-particles>
    <div class="main">
      <div class="container">
        <div class="content">
          <div class="padding-box">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
    <div class="text">
      <span class="title">weblog</span>
      <span class="dis">你值得使用的博客平台</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "signUp",
};
</script>

<style scoped lang='scss'>
.root {
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background:linear-gradient(var(--clr), skyblue);

  .lizi {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .main {
    position: absolute;
    right: 8vw;
    width: 350px;
    height: 500px;
    border-radius: 1.5rem;
    overflow: hidden;

    .container {
      width: 100%;
      height: 100%;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #000;

      .content {
        color: #fff;
        width: calc(100% - 4px);
        height: calc(100% - 4px);
        border-radius: 1.5rem;
        background:linear-gradient(skyblue, var(--clr));
        z-index: 10;
        font-size: 1.5rem;

        .padding-box {
          padding: 2rem;
        }
      }
    }

    .container::after {
      content: "";
      width: 100%;
      height: 100%;
      background: linear-gradient(#fff, transparent, transparent);
      position: absolute;
      top: 50%;
      left: -50%;
      z-index: 1;
      animation: myAnimate 4s linear infinite;
      transform-origin: top right;
    }

    .container::before {
      content: "";
      width: 100%;
      height: 100%;
      background: linear-gradient(transparent, transparent, var(--border-clr1));
      position: absolute;
      top: -50%;
      left: 50%;
      z-index: 1;
      animation: myAnimate 4s linear infinite;
      transform-origin: bottom left;
    }
  }

  .text {
    position: absolute;
    top: 10vw;
    left: 20vw;
    color: #fff;

    .title {
      display: block;
      font-size: 10rem;
      font-family: qiantu;
    }

    .dis {
      display: block;
      margin-top: 4rem;
      font-size: 3.5rem;
      font-family: qiantu;
    }
  }
}

@keyframes myAnimate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>