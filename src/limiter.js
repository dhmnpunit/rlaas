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


function addTokens(bucket) {
    const now = Date.now() / 1000; // current time in seconds
    const elapsed = now - bucket.lastRefill;

    console.log("Time passed: ", elapsed);

    // add tokens equals to time passed
    bucket.tokens = bucket.tokens + elapsed;

    // cap it to max 5 tokens
    if(bucket.tokens > 5) {
        bucket.tokens = 5;
    }

    // update last refill time
    bucket.lastRefill = now;

    return bucket.tokens;
}

const bucket = { tokens: 0, lastRefill: Date.now() / 1000 - 3};
console.log("Tokens before: ", bucket.tokens);
console.log("Tokens added: ", addTokens(bucket));