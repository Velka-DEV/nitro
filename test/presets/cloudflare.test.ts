import { resolve } from 'pathe'
import { Miniflare } from 'miniflare'
import { describe } from 'vitest'

import { setupTest, testNitro } from '../utils'

describe('nitro:preset:cloudflare', () => {
  const ctx = setupTest('cloudflare')
  testNitro(ctx, () => {
    const mf = new Miniflare({ scriptPath: resolve(ctx.outDir, 'server/index.mjs') })
    return async ({ url, headers, method, body }) => {
      const data = await mf.dispatchFetch('http://localhost' + url, {
        headers: headers || {},
        method: method || 'GET',
        body
      }).then(r => r.text())
      return { data }
    }
  })
})
