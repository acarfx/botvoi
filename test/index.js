const BotVoi = require('../src/index.js');
const BotVoiClient = new BotVoi("free");

// Örnek: Kullanıcı verilerini çekme
// Not: "free" anahtarı sınırlı erişim sağlar.
BotVoiClient.fetch('985023331130552331')
    .then(console.log)
    .catch(console.error);