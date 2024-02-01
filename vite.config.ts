import { defineConfig } from 'vite'
import RubyPlugin from 'vite-plugin-ruby'

export default defineConfig({
  server: {
      https: false,
      host: '127.0.0.1',
  },
  plugins: [
    RubyPlugin(),
  ],
})
