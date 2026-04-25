<template>
  <div class="app-shell">
    <router-view />
  </div>
</template>

<style lang="scss">
:root {
  color-scheme: dark;
  --page-bg: #000516;
  --text-main: #eaf6ff;
  --text-sub: #a8c6e4;
}

html,
body,
#app {
  width: 100%;
  height: 100%;
  margin: 0;
}

body {
  overflow: hidden;
  font-family: 'Microsoft YaHei', 'PingFang SC', sans-serif;
  background: var(--page-bg);
  color: var(--text-main);
}

button {
  font: inherit;
}

.app-shell {
  width: 100%;
  height: 100%;
}
</style>
