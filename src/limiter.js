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

function consume(bucket, capacity, refillRate, nowSeconds) {
    // refill first so bucket.tokens is up to date
    const tokens = refill(bucket, capacity, refillRate, nowSeconds);

    if (tokens >= 1) {
        // allow: remove one token
        bucket.tokens = tokens - 1;
        return { allowed: true, remaining: Math.floor(bucket.tokens) };
    } else {
        // blocked: how many seconds until next token?
        const waitSeconds = (1 - tokens) / refillRate;
        return { allowed: false, retryAfter: Math.ceil(waitSeconds), remaining: Math.floor(tokens)}
    }
}


