<template>
  <div class="nav">
    <div class="content">
      <div class="logo">W-space</div>
      <div class="menu">
        <ul>
          <li><i class="bx bxs-cog"></i></li>
          <li><i class="bx bx-question-mark"></i></li>
          <li><i class="bx bxs-user-circle"></i></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.nav {
  border-bottom: 1px solid rgb(238, 236, 236);
  .content {
    width: 95%;
    margin: 15px auto 0;
    display: flex;
    justify-content: space-between;
    .logo {
      font-size: 20px;
      text-transform: uppercase;
    }
    ul {
      list-style: none;
      display: flex;
      font-size: 20px;
      li {
        font-size: 25px;
        i {
          margin-left: 25px;
        }
      }
    }
  }
}
</style>
