import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * `api/contact.ts` runs on Vercel in production. During `npm run dev` there is
 * no Vercel runtime, so this plugin mounts the same handler on the dev server
 * and feeds it the secrets from `.env`.
 */
function contactApi(): Plugin {
  return {
    name: 'contact-api-dev',
    apply: 'serve',
    config(_config, { mode }) {
      const env = loadEnv(mode, process.cwd(), '')
      for (const key of ['TELEGRAM_BOT_TOKEN', 'TELEGRAM_CHAT_ID']) {
        if (!process.env[key] && env[key]) process.env[key] = env[key]
      }
    },
    configureServer(server) {
      server.middlewares.use('/api/contact', (req, res) => {
        void (async () => {
          try {
            const chunks: Buffer[] = []
            for await (const chunk of req) chunks.push(chunk as Buffer)

            const mod = await server.ssrLoadModule('/api/contact.ts')
            const handler = mod.default as (r: Request) => Promise<Response>

            const response = await handler(
              new Request('http://localhost/api/contact', {
                method: req.method,
                headers: {
                  'content-type':
                    req.headers['content-type'] ?? 'application/json',
                },
                body:
                  req.method === 'GET' || req.method === 'HEAD'
                    ? undefined
                    : Buffer.concat(chunks),
              })
            )

            res.statusCode = response.status
            response.headers.forEach((value, key) => res.setHeader(key, value))
            res.end(await response.text())
          } catch (error) {
            server.config.logger.error(`[contact-api-dev] ${String(error)}`)
            res.statusCode = 500
            res.setHeader('content-type', 'application/json')
            res.end(JSON.stringify({ ok: false, error: 'Dev handler failed' }))
          }
        })()
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), contactApi()],
})
