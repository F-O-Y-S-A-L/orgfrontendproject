<template>
  <footer class="bg-gray-800 text-gray-300">
    <div class="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
      <!-- Left -->
      <p class="text-sm">&copy; 2026 MyApp. All rights reserved.</p>

      <!-- Right -->
      <nav class="space-x-4 text-sm">
        <NuxtLink to="/footer/about" class="hover:text-white">About</NuxtLink>
        <NuxtLink to="/footer/privacy" class="hover:text-white">Privacy</NuxtLink>
        <NuxtLink to="/footer/contact" class="hover:text-white">Contact</NuxtLink>
      </nav>
    </div>
  </footer>
</template>