<template>
  <svg
    class="spinner"
    width="16"
    height="16"
    viewBox="0 0 50 50"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
  >
    <circle
      class="spinner__circle"
      cx="25"
      cy="25"
      r="20"
      stroke="currentColor"
      stroke-width="5"
    />
  </svg>
</template>

<style lang="scss">
.spinner {
  animation: spinner-rotate 0.8s linear infinite;
  color: #007bff;
  display: inline-block;
  vertical-align: middle;
}

.spinner__circle {
  stroke-dasharray: 90, 150;
  stroke-dashoffset: 0;
  stroke-linecap: round;
  animation: spinner-dash 1.5s ease-in-out infinite;
}

@keyframes spinner-rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes spinner-dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}
</style>
