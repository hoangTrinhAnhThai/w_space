<template>
  <div class="home-page">
    <div class="main-page">
      <div class="container1">
        <navigation class="nav" />
        <h1>TEAM work</h1>
      </div>
      <div class="container2">
        <h1>Solutions for every bussiness need</h1>
        <hr style="width: 200px; margin: auto; margin: 15px auto" />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod ipsum
          nobis sequi eum eos, reprehenderit ad at recusandae, provident fuga
          eaque! Perspiciatis aspernatur, tenetur numquam nesciunt expedita
          atque corporis quam?
        </p>
      </div>
      <div class="container3">
        <div class="content">
          <div class="content-left">
            <h1>
              Unlocking the
              <span style="color: rgb(254, 64, 102)">potential</span> of those
              who advance the world
            </h1>
            <p>
              numquam odit ab eius minus voluptatum tenetur, minima beatae
              voluptas ut, quia nobis necessitatibus optio.
            </p>
          </div>
          <div class="content-right">
            <img
              src="https://vanquyengallery.com/wp-content/uploads/2019/11/Tranh-%C4%91%E1%BB%99ng-l%E1%BB%B1c-Teamwork-makes-dream-work-3-3125.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from "../components/Navigation.vue";
export default {
  name: "HomePage",
  components: {
    Navigation,
  },
};
</script>

<style scoped>
.container {
  margin: 0 !important;
  padding: 0 !important;
  background-color: rgb(243, 235, 255);
  width: 100% !important;
}
p {
  box-shadow: none !important;
}
.nav {
  box-shadow: none !important;
  background-color: none !important;
}
img {
  width: 50px;
}
.nav {
  /* position: fixed; */
}
</style>

<style lang="scss" scoped>
.main-page {
  display: flex;
  flex-direction: column;
  width: 100%;
  .container1 {
    color: black;
    background-image: linear-gradient(
        rgba(29, 28, 28, 0.6),
        rgba(36, 35, 35, 0.6)
      ),
      url("https://shrm.pace.edu.vn/CMSFileManager/files/10/10f300de-0edc-449d-9959-0b4535664720.png");
    background-color: #232323;
    background-position: bottom center;
    background-size: cover;
    height: 100vh;
    h1 {
      font-size: 200px;
      color: rgba(255, 255, 255, 0.4);
      text-align: center;
      margin-top: 30vh;
    }
  }
  .container2 {
    width: 50%;
    margin: 50px auto 25px;
    text-align: center;
    line-height: 30px;
    letter-spacing: 3px;
    h1 {
      font-size: 2.5em;
    }
  }
  .container3 {
    background-color: rgb(199, 211, 247);
    margin-bottom: 200px;
    margin-top: 50px;
    .content {
      display: flex;
      width: 75%;
      margin: auto;
      justify-content: space-between;
      .content-left {
        margin-top: 10%;
        width: 50%;
        h1 {
          font-size: 2.5em;
          font-weight: bolder;
          letter-spacing: 5px;
        }
      }
      img {
        width: 400px;
        height: 500px;
        position: relative;
        top: 15%;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
          rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
          rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
      }
    }
  }
}
</style>
