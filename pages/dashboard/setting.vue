<template>
  <div class="min-h-screen bg-gray-100 flex flex-col items-center py-10">
    <div class="bg-white shadow-lg rounded-lg w-full max-w-4xl p-8 space-y-10">
      <!-- Header -->
      <h2 class="text-3xl font-bold text-gray-800">⚙️ Settings</h2>

      <!-- Profile Settings -->
      <section>
        <h3 class="text-xl font-semibold text-gray-700 mb-4">Profile Settings</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-gray-600">Full Name</label>
            <input type="text" placeholder="Enter your name"
              class="w-full border rounded px-4 py-2 focus:ring focus:ring-blue-300" />
          </div>
          <div>
            <label class="block text-gray-600">Email</label>
            <input type="email" placeholder="Enter your email"
              class="w-full border rounded px-4 py-2 focus:ring focus:ring-blue-300" />
          </div>
          <div>
            <label class="block text-gray-600">Avatar</label>
            <input type="file" class="w-full border rounded px-4 py-2" />
          </div>
        </div>
      </section>

      <!-- Account Settings -->
      <section>
        <h3 class="text-xl font-semibold text-gray-700 mb-4">Account Settings</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-gray-600">Change Password</label>
            <input type="password" placeholder="New password"
              class="w-full border rounded px-4 py-2 focus:ring focus:ring-blue-300" />
          </div>
          <div class="flex items-center space-x-3">
            <input type="checkbox" id="notifications" class="h-5 w-5 text-blue-600" />
            <label for="notifications" class="text-gray-600">Enable Notifications</label>
          </div>
        </div>
      </section>

      <!-- Preferences -->
      <section>
        <h3 class="text-xl font-semibold text-gray-700 mb-4">Preferences</h3>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-gray-600">Theme</span>
            <button class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">🌙 Dark Mode</button>
          </div>
          <div>
            <label class="block text-gray-600">Language</label>
            <select class="w-full border rounded px-4 py-2 focus:ring focus:ring-blue-300">
              <option>English</option>
              <option>বাংলা</option>
              <option>Arabic</option>
            </select>
          </div>
        </div>
      </section>

      <!-- Actions -->
      <div class="flex justify-end space-x-4">
        <button class="px-6 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
        <button class="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save Changes</button>
      </div>
    </div>
  </div>
</template>