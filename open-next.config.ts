// default open-next.config.ts file created by @opennextjs/cloudflare
import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";

export default defineCloudflareConfig({
	// Backed by the "bb-blossoms-cache" R2 bucket (see wrangler.jsonc's
	// NEXT_INC_CACHE_R2_BUCKET binding) — lets prerendered/ISR pages be
	// served straight from R2 instead of re-invoking the Worker on every
	// request. See https://opennext.js.org/cloudflare/caching
	incrementalCache: r2IncrementalCache,
});
