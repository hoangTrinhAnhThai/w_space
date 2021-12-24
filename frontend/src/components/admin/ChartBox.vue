<template>
  <div class="box-chart">
    <div class="container">
      <div class="content content1">
        <p>Số lượng user trong ngày</p>
        <h5>0</h5>

        <span> more than yesterday </span>
      </div>
      <div class="content content2">
        <p>Số lượng user trong tháng</p>
        <h5>data</h5>
        <span> data more than last month </span>
      </div>
      <div class="content content3">
        <p>Số lượng project trong ngày</p>
        <h5>0</h5>

        <span> more than yesterday </span>
      </div>
      <div class="content content4">
        <p>Số lượng project trong tháng</p>
        <h5>data</h5>
        <span> data more than last month </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
<style>
p {
  box-shadow: none;
}
</style>
<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
  .content {
    flex-basis: 20%;
    padding: 10px 15px 0px;
    border: 1px solid rgb(209, 206, 206);
    border-radius: 5px;
    color: white;
    p {
      text-transform: uppercase;
      font-size: 11px;
      padding: 0;
      margin: 0;
    }
    h5 {
      padding: 0;
      margin: 0;
      font-size: 25px;
    }
    span {
      font-size: 11px;
    }
  }
  .content1 {
    background-color: rgb(99, 194, 223);
  }
  .content2 {
    background-color: rgb(231, 201, 108);
  }
  .content3 {
    background-color: rgb(249, 108, 108);
  }
  .content4 {
    background-color: rgb(119, 190, 119);
  }
}
</style>
