<template>
  <div class="loader">Loading...</div>
</template>

<style>
.loader {
  text-align: center;
  font-size: 18px;
  color: #007bff;
  animation: blink 1s infinite;
}

@keyframes blink {
  50% {
    opacity: 0.5;
  }
}
</style>
