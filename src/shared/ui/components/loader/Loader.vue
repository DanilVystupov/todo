<template>
  <div class="loader">
    <span class="loader__dot"></span>
    <span class="loader__dot"></span>
    <span class="loader__dot"></span>
    <span class="loader__text">Loading</span>
  </div>
</template>

<style scoped>
.loader {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 20px;
  font-family: 'Segoe UI', sans-serif;
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

.loader__text {
  font-size: 16px;
  color: #007bff;
  font-weight: 500;
  margin-left: 10px;
  animation: fadeIn 1.5s ease-in-out infinite alternate;
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

@keyframes fadeIn {
  from {
    opacity: 0.3;
    transform: translateX(-5px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
