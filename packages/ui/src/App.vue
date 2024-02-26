<script setup lang="ts">
import { ref } from 'vue';

interface Convention {
  titleShort: string;
  titleLong: string;
  cycleStart: string;
  cycleEnd: string;
  cycleYear: number;
  startDate: string;
  endDate: string;
}

const backendData = ref<Convention[]>([]);
const requestData = async () => {
  const response = await fetch('http://localhost:3000/convention');
  const conventions = await response.json();
  backendData.value = conventions;
}

const onSubmit = async (evt: any) => {
  evt.preventDefault();

  await fetch('http://localhost:3000/convention', {
    method: 'POST',
    mode: 'cors',
    headers: {
      "Content-Type": "application/json"
    }
  });

  requestData();
}

requestData();
</script>

<template>
  <div>
    <form>
      <button type="submit" @click="onSubmit">Create Convention Entry</button>
    </form>

    <template v-for="convention in backendData">
      <p>
        Title Long: {{ convention.titleLong }} || Title Short: {{ convention.titleShort }}
      </p>
      <p>
        Cycle Year: {{ convention.cycleYear }} || Cycle Start: {{ convention.cycleStart }} || Cycle End: {{ convention.cycleEnd }}
      </p>
      <p>
        Start Date: {{ convention.startDate }} || End Date: {{ convention.endDate }}
      </p>
      <hr/>
    </template>
  </div>
</template>