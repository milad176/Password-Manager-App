<template>
  <div class="footer">
    <p>© My APP | version 1.0.0 | www.myapp.com</p>
    <a class="footel-link-text" href target="_blank">My.App</a>
  </div>
</template>

<script>
export default {
  name: "AppFooter",
  props: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.footer {
  height: 150px;
  width: 100%;
  color: #ffffff;
  align-items: center;
  background-color: #002237;
  position: absolute;
  bottom: 0px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.footel-link-text {
  font-weight: bold;
  color: #e57100;
}
</style>