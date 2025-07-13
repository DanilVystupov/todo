<template>
  <div class="loader">
    <span class="loader__dot"></span>
    <span class="loader__dot"></span>
    <span class="loader__dot"></span>
  </div>
</template>

<style scoped>
.loader {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 20px;
  position: relative;
}

.loader__dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #007bff;
  animation: bounce 1.2s infinite ease-in-out;
}

.loader__dot:nth-child(1) {
  animation-delay: 0s;
}
.loader__dot:nth-child(2) {
  animation-delay: 0.15s;
}
.loader__dot:nth-child(3) {
  animation-delay: 0.3s;
}

@keyframes bounce {
  0%, 80%, 100% {
    transform: scale(0.9);
    opacity: 0.5;
  }
  40% {
    transform: scale(1.3);
    opacity: 1;
  }
}
</style>
