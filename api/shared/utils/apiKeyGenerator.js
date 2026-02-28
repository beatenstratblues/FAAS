const crypto = require("node:crypto");

exports.apiKeyGenerator = () => {
    const secretHash = crypto.randomBytes(32).toString("hex");

    const apiKey = `faas-${secretHash}`;

    const apiKeyHash = crypto.createHash("sha256").update(apiKey).digest("hex");

    return { apiKey, apiKeyHash };
}