export default function handler(req, res) {
    let clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    // Handle IPv6-mapped IPv4 addresses (e.g., ::ffff:192.168.1.1)
    if (clientIp.startsWith("::ffff:")) {
        clientIp = clientIp.substring(7);
    }

    res.status(200).json({ ip: clientIp });
}