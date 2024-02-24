<script setup lang="ts">
import { ref } from 'vue';

const backendData = ref('');
fetch('http://localhost:3000/sample')
  .then((response) => {
    response.json().then((body) => {
      backendData.value = JSON.stringify(body);
    });
  });
</script>

<template>
  <div>
    Hello, World! TEST AGAIN
    <p>
      {{ backendData }}
    </p>
    <p>
      MORE TEXT
    </p>
  </div>
</template>