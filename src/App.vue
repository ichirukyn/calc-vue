<template>
  <div class="App">
    <router-view />
  </div>
</template>

<style lang="scss">
@import "./src/assets/scss/nullstyle.scss";
@import "./src/assets/scss/var.scss";

@font-face {
  font-family: $main_font; 
  src: url($font_path) format("truetype"); 
  font-style: normal; 
  font-weight: normal; 
} 

* {
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
  border: none;
  color: #fff;
  font-size: 16px;
  transition: 0.3s;
  font-family: $main_font;
  font-size: $text_big;
}

body {
  background: $bg_body;
}
</style>
