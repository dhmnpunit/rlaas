const BUCKETS = require('./bucketStore');

function getBucketForKey(key, capacity) {
    // if bucket exists in map -> return it

    if ( BUCKETS.has(key) ) {
        return BUCKETS.get(key);
    } 
    // else create new bucket and store it in the map

    const newBucket = {
        tokens: capacity,
        lastRefill: Date.now()/1000
    };

    // then return the new bucket
    BUCKETS.set(key, newBucket);
    return newBucket;
}

module.exports = getBucketForKey

