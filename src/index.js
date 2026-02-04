const express = require('express');
const getBucketForKey = require('./getBucket');
const { consume } = require('./limiter');

const app = express();
const PORT = 3000;

// Rate limiting configuration
const CAPACITY = 5;      // max tokens
const REFILL_RATE = 1;   // 1 token per second

// Rate limiting middleware
function rateLimiter(req, res, next) {
    const apiKey = req.headers['x-api-key'];
    
    if (!apiKey) {
        return res.status(401).json({ error: 'Missing x-api-key header' });
    }
    
    const bucket = getBucketForKey(apiKey, CAPACITY);
    const result = consume(bucket, CAPACITY, REFILL_RATE, Date.now() / 1000);
    
    // Set rate limit headers
    res.set('X-RateLimit-Remaining', result.remaining);
    res.set('X-RateLimit-Limit', CAPACITY);
    
    if (!result.allowed) {
        res.set('Retry-After', result.retryAfter);
        return res.status(429).json({ 
            error: 'Too Many Requests',
            retryAfter: result.retryAfter 
        });
    }
    
    next();
}

// Protected test endpoint
app.get('/test', rateLimiter, (req, res) => {
    res.json({ 
        message: 'Request allowed!',
        timestamp: new Date().toISOString()
    });
});

// Health check endpoint (not rate limited)
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.listen(PORT, () => {
    console.log(`🚀 RLaaS server running on http://localhost:${PORT}`);
    console.log(`📝 Test endpoint: GET /test (requires x-api-key header)`);
    console.log(`💡 Try: curl -H "x-api-key: test123" http://localhost:${PORT}/test`);
});
