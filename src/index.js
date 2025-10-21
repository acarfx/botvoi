const fetch = require('node-fetch');

const TYPE_MAP = new Map([
    ['ban', 'Ban'],
    ['forceban', 'ForceBan'],
    ['jail', 'Jail'],
    ['chatmute', 'ChatMute'],
    ['chat-mute', 'ChatMute'],
    ['voicemute', 'VoiceMute'],
    ['voice-mute', 'VoiceMute'],
    ['timeout', 'Timeout'],
    ['warning', 'Warning'],
    ['underworld', 'Underworld'],
    ['unban', 'UnBan'],
    ['unforceban', 'UnForceBan'],
    ['unjail', 'UnJail'],
    ['unchatmute', 'UnChatMute'],
    ['un-chat-mute', 'UnChatMute'],
    ['unvoicemute', 'UnVoiceMute'],
    ['un-voice-mute', 'UnVoiceMute'],
    ['untimeout', 'UnTimeout'],
    ['ununderworld', 'UnUnderworld'],
]);

const BASE_URL = 'https://botvoi.com/api/v1/@/user/';

class BotVoi {
    constructor(key = null) {
        this.key = key;
    }

    setKey(key) {
        if (!key) throw new Error("API key boş olamaz!");
        this.key = key;
    }

    async _request(method, userId, body) {
        if (!this.key) throw new Error("API key ayarlanmadan veri çekilemez!");

        const url = `${BASE_URL}${encodeURIComponent(userId)}?key=${encodeURIComponent(this.key)}`;
        const options = {
            method,
            headers: { 'Accept': 'application/json' }
        };

        if (body) {
            options.headers['Content-Type'] = 'application/json';
            options.body = JSON.stringify(body);
        }

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            if (data && data.error) throw new Error(data.error);
            return data;
        } catch (error) {
            throw error;
        }
    }

    async fetch(userId) {
        const data = await this._request('GET', userId);
        return new User(data);
    }

    async punitivesSet(userId, type, reason) {
        if (!type) throw new Error("Geçersiz 'type' parametresi!");

        const normalize = (s) =>
            String(s).trim().toLowerCase().replace(/\s+/g, '').replace(/[-_]+/g, '');

        // TYPE_MAP anahtarlarını normalize ederek esnek eşleştirme yap
        const normalizedMap = new Map();
        for (const [k, v] of TYPE_MAP.entries()) {
            const nk = normalize(k);
            if (!normalizedMap.has(nk)) normalizedMap.set(nk, v);
        }

        const mappedType = normalizedMap.get(normalize(type));
        if (!mappedType) {
            const allowed = Array.from(new Set(Array.from(TYPE_MAP.values())));
            throw new Error(`Geçersiz ceza türü: "${type}". Desteklenen türler: ${allowed.join(', ')}`);
        }

        const data = await this._request('POST', userId, { type: mappedType, reason });
        return data.data;
    }
}

class User {
    constructor(data) {
        const member = (data && data.member) || {};
        Object.assign(this, member);

        this.guilds = (data && data.guilds) || [];
        const lastActivities = (data && data.last_activities) || { last_seen: null, items: [] };

        this.activities = {
            Seen: lastActivities.last_seen,
            Activities: lastActivities.items,
        };

        this.punitives = (data && data.punitives) || [];
    }

    toJSON() {
        return this;
    }
}

module.exports = BotVoi;