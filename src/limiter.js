/**
 * refill(bucket, capacity, refillRate, nowSeconds)
 *
 * bucket: { tokens: number, lastRefill: number }
 * capacity: maximum tokens (number)
 * refillRate: tokens per second (number, can be fractional)
 * nowSeconds: current time in seconds (number) — pass Date.now()/1000 in callers or tests
 *
 * The function should:
 *  - compute elapsed = nowSeconds - bucket.lastRefill (guard >= 0)
 *  - compute add = elapsed * refillRate
 *  - increase bucket.tokens by add but don't exceed capacity
 *  - set bucket.lastRefill = nowSeconds (or to nowSeconds if you used partial refill logic)
 *  - return bucket.tokens (the new token count, as a number)
 */


/*

time moves -> tokens increase
you cannot exceed a limit
you must update "last time you refilled"

*/


function refill(bucket, capacity, refillRate, nowSeconds) {
    const elapsed = nowSeconds - bucket.lastRefill;

    console.log("Time passed: ", elapsed);

    // add tokens equals to time passed
    const add = elapsed * refillRate;
    bucket.tokens = Math.min(capacity, bucket.tokens + add);

    // update last refill time
    bucket.lastRefill = nowSeconds;

    return bucket.tokens;
}

const bucket = { tokens: 2, lastRefill: Date.now() / 1000 - 2};
const now = Date.now()/1000;
const newTokens = refill(bucket, 5, 1, now)

console.log("Tokens added: ", newTokens);