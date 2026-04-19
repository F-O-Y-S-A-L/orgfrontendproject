<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section
      class="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-20"
    >
      <div class="max-w-7xl mx-auto px-6 text-center">
        <h1 class="text-4xl font-bold mb-4">Welcome to MyApp</h1>
        <p class="text-lg mb-6">
          Manage your organizations, projects, and tasks seamlessly.
        </p>
        <NuxtLink
          to="auth/signup"
          class="bg-white text-purple-600 px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition"
        >
          Get Started
        </NuxtLink>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-6">
        <h2 class="text-2xl font-bold text-center mb-12">Features</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            class="bg-white rounded-lg shadow p-6 text-center hover:shadow-md transition"
          >
            <h3 class="text-lg font-semibold mb-2">Organizations</h3>
            <p class="text-gray-600">
              Create and manage workspaces for your teams.
            </p>
          </div>
          <div
            class="bg-white rounded-lg shadow p-6 text-center hover:shadow-md transition"
          >
            <h3 class="text-lg font-semibold mb-2">Projects</h3>
            <p class="text-gray-600">
              Organize projects and track progress easily.
            </p>
          </div>
          <div
            class="bg-white rounded-lg shadow p-6 text-center hover:shadow-md transition"
          >
            <h3 class="text-lg font-semibold mb-2">Tasks</h3>
            <p class="text-gray-600">
              Assign tasks and collaborate in real time.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="bg-purple-50 py-16">
      <div class="max-w-7xl mx-auto px-6 text-center">
        <h2 class="text-2xl font-bold mb-4">Ready to get started?</h2>
        <p class="text-gray-600 mb-6">
          Sign up today and boost your productivity.
        </p>
        <NuxtLink
          to="auth/signup"
          class="bg-purple-600 text-white px-6 py-3 rounded-lg shadow hover:bg-purple-700 transition"
        >
          Create Account
        </NuxtLink>
      </div>
    </section>
  </div>
</template>