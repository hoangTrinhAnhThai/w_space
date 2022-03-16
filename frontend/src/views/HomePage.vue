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
      <div class="container4">
        <div class="cont4-child1">
          <h2>WHY W-SPACE?</h2>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam nostrum
          exercitationem ullam corrupti assumenda, quas delectus sit fugit,
          aperiam eius odit aliquam velit, facilis corporis adipisci dolorum
          blanditiis. Inventore, suscipit!
        </div>
        <div class="cont4-child2">
          <div class="cont4-sub sub1">
            <v-icon>mdi-file-table-box-multiple-outline</v-icon>
            <h4>workflow management</h4>
            Lorem ipsum dolor sit ame ab numquam obcaecati assumenda iure
            laudantium enim distinctio illum velit unde quisquam atque cumque
            co
          </div>
          <div class="cont4-sub sub2">
            <v-icon>mdi-clipboard-text-clock-outline</v-icon>
            <h4>Time tracking</h4>
            Lorem ipsum dolor sit amet distinctio illum velit consectetur
            adipisicing elit. Quo eligendi dolorum, voluptas ab numquam
            laudantium enim distin
          </div>
          <div class="cont4-sub sub3">
            <v-icon>mdi-wechat</v-icon>
            <h4>Chat</h4>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
            eligendi dolorum, voluptas ab distinctio illum ve
          </div>
          <div class="cont4-sub sub4">
            <v-icon>mdi-view-dashboard-variant</v-icon>
            <h4>Better view</h4>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
            eligendi dolorum, voluptas ab numquam m enim distinctio illum veli
            obcaecati assumenda iure laudantium enim dist
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <footer class="text-center text-white">
        <div  style="margin: 0 auto !important">
          <section class="mb-4">
            <a
              class="btn btn-link btn-floating btn-lg text-dark m-1"
              href="#!"
              role="button"
              data-mdb-ripple-color="dark"
              ><i class='bx bxl-facebook'></i></a>
            <a
              class="btn btn-link btn-floating btn-lg text-dark m-1"
              href="#!"
              role="button"
              data-mdb-ripple-color="dark"
              ><i class='bx bxl-twitter' ></i></a>
            <a
              class="btn btn-link btn-floating btn-lg text-dark m-1"
              href="#!"
              role="button"
              data-mdb-ripple-color="dark"
              ><i class='bx bxl-google' ></i></a>
            <a
              class="btn btn-link btn-floating btn-lg text-dark m-1"
              href="#!"
              role="button"
              data-mdb-ripple-color="dark"
              ><i class='bx bxl-instagram' ></i></a>
            <a
              class="btn btn-link btn-floating btn-lg text-dark m-1"
              href="#!"
              role="button"
              data-mdb-ripple-color="dark"
              ><i class='bx bxl-linkedin-square'></i></a>
            <a
              class="btn btn-link btn-floating btn-lg text-dark m-1"
              href="#!"
              role="button"
              data-mdb-ripple-color="dark"
              ><i class='bx bxl-github' ></i></a>
          </section>
        </div>
        <div
          class="text-center text-dark"
        >
          © 2020 Copyright:
          <a class="text-dark" href="https://mdbootstrap.com/"
            >W-space</a
          >
        </div>
      </footer>
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
  /* background-color: rgb(243, 235, 255); */
  background-color: rgb(244, 245, 254);
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
      font-weight: bold;
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
    background-color: rgb(244, 245, 254);
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
  .container4 {
    background-image: linear-gradient(
        rgba(29, 28, 28, 0.6),
        rgba(36, 35, 35, 0.6)
      ),
      url("../assets/Office.png");
    height: 90vh;
    background-size: cover;
    background-position: center;
    .cont4-child1 {
      color: #fff;
      text-align: center;
      width: 50%;
      margin: 20px auto;
      font-size: 15px;
    }
    .cont4-child2 {
      display: flex;
      justify-content: center;
      height: 70%;
      .cont4-sub {
        width: 15%;
        background-color: #fff;
        border-radius: 10px;
        margin: 2% 20px;
        padding: 30px;
        .v-icon {
          font-size: 30px;
        }
        h4 {
          margin-bottom: 20px;
        }
      }
      .sub1 {
        .v-icon {
          color: red;
        }
      }
      .sub2 {
        .v-icon {
          color: green;
        }
      }
      .sub3 {
        .v-icon {
          color: orange;
        }
      }
      .sub4 {
        .v-icon {
          color: blue;
        }
      }
    }
  }
}
.footer {
    // background-color: rgb(226, 221, 221);
    padding: 20px 0
  }
</style>
