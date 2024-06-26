<script setup lang="ts">
import { ref } from 'vue'
import { supabase } from '@/lib/supabaseClient'

const projects = ref()

;(async () => {
  const { data, error } = await supabase.from('projects').select()

  if (error) console.error(error)

  projects.value = data
})()
</script>
<template>
  <div>
    <h1>Projects page</h1>
    <p>{{ projects.length }} projects</p>
    <RouterLink to="/">Home</RouterLink>
  </div>
</template>
