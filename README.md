# Rate Limiter as a Service — Project Charter

**Mission:** Learn how production-grade rate limiting works by building a prototype RLaaS.  
**Tech stack (Milestone 0):** Node.js, Express, in-memory JS objects, git.

**MVP (Milestone 0):**
- Single-process token-bucket middleware.
- Protect one endpoint `/test` using `x-api-key` header.
- Demo script showing allow → 429 behavior.
- Short DESIGN.md or section answering 5 thought prompts.

**Success criteria:**
- I can run `node src/index.js` and reproduce 5 requests allowed then 429.
- README documents how to run and test.

**Constraints:** No Redis yet. Keep it simple and synchronous for now.
