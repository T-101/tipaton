export function getJsonFromUrl(url) {
    if (!url) url = window.location.search;
    var query = url.substr(1);
    var result = {};
    query.split("&").forEach(function (part) {
        var item = part.split("=");
        result[item[0]] = decodeURIComponent(item[1]);
    });
    return result;
}

export function alteredStartDate() {
    const params = getJsonFromUrl();
    if ("start" in params) {
        if (Number(params.start)) {
            if (0 < Number(params.start) && Number(params.start) < 32) {
                return params.start
            }
        }
    }
}

function leftPad(number) {
    return number < 10 ? "0" + number : number
}

function start() {
    const day = alteredStartDate() ? leftPad(alteredStartDate()) : "01";
    const year = new Date().getFullYear();
    return new Date(`${year}-01-${day}T00:00`)
}

function end() {
    let then = start();
    then.setDate(then.getDate() + 31);
    return then
}

export function elapsedDays() {
    return Math.ceil((new Date() - start()) / 1000 / 60 / 60 / 24);
}

export function getPercent() {
    const janSeconds = end() - start();
    const secondsElapsed = new Date() - start();
    return secondsElapsed < 0 ? Number(0).toFixed(3) : Number((secondsElapsed / janSeconds) * 100).toFixed(3);
}

export function getRemaining(that, precision) {
    const janSeconds = Number((end() - start()) / 1000).toFixed(0);
    const millisecondsElapsed = (that.dateTime - start());
    const secondsElapsed = Number((millisecondsElapsed / 1000)).toFixed(0);
    const remaining = janSeconds - secondsElapsed;
    let multiplier = 1;
    switch (precision) {
        case "min":
            multiplier *= 60;
            break;
        case "hour":
            multiplier *= 3600;
            break;
        case "day":
            multiplier *= 86400;
            break;
        case "week":
            multiplier *= 604800;
            break;
        default:
            break
    }
    if (multiplier >= 86400) return Number(remaining / multiplier).toFixed(2);
    return Math.floor(remaining / multiplier);
}

export function getLevelName(percent) {
    const levels = [
        {percent: 0, name: "Kraanavesi"},
        {percent: 2.6, name: "Teinilonkero"},
        {percent: 4.4, name: "Koff III"},
        {percent: 5.5, name: "Lonkero"},
        {percent: 6, name: "IPA"},
        {percent: 7.2, name: "Elephant Beer"},
        {percent: 8, name: "Tosi Vahva Karhu"},
        {percent: 11, name: "Aperol"},
        {percent: 13, name: "Punaviini"},
        {percent: 15, name: "Vermouth Bianco"},
        {percent: 17, name: "Baileys"},
        {percent: 18, name: "Puolukkavodka Cocktail"},
        {percent: 19, name: "Royal Salmiakki Snapsi"},
        {percent: 20, name: "Kahvilikööri"},
        {percent: 21, name: "Gambina"},
        {percent: 22, name: "Hehkuviini"},
        {percent: 24, name: "Heering Cherry"},
        {percent: 27, name: "Saunalahden Viina"},
        {percent: 28, name: "Disaronno Originale"},
        {percent: 30, name: "Galliano"},
        {percent: 31, name: "Licor 43 Cuarenta y Tres"},
        {percent: 32, name: "Salmiakkikossu"},
        {percent: 35, name: "Jägermeister"},
        {percent: 37, name: "Concorde XO"},
        {percent: 38, name: "Koskenkorva"},
        {percent: 40, name: "Russian Standard"},
        {percent: 41, name: "Jaloviina Extra"},
        {percent: 43, name: "Lagavulin"},
        {percent: 44, name: "Hammer & Son Gin"},
        {percent: 45, name: "Makers Mark"},
        {percent: 45.8, name: "Talisker 10 Year Old Single Malt"},
        {percent: 46.3, name: "Napue Gin"},
        {percent: 48, name: "Laphroaig Quarter Cask Single Malt"},
        {percent: 50, name: "Minttuviina"},
        {percent: 54, name: "Stroh"},
        {percent: 55, name: "Macallan Classic Cut"},
        {percent: 57.1, name: "Ardbeg Corryvreckan Single Malt"},
        {percent: 60, name: "Kaatoryyppy"},
        {percent: 62, name: "Lucid Absinthe"},
        {percent: 64, name: "De Kuyper Original Elixirs Orange"},
        {percent: 69, name: "Clarke's Court Spicy Rum"},
        {percent: 70, name: "King of Spirits Absinthe"},
        {percent: 75.5, name: "Bacardi 151"},
        {percent: 80, name: "John Crow Batty Rum"},
        {percent: 88, name: "Balkan 176 Vodka"},
        {percent: 88.8, name: "Pincer Shanghai Strength"},
        {percent: 90, name: "River Antoine Royale Rum"},
        {percent: 92, name: "Bruichladdich X4"},
        {percent: 95, name: "Everclear"},
        {percent: 96, name: "Spiritus Fortis"}
    ]
    for (let i = 0; i < levels.length; i++) {
        if (percent < levels[i].percent) return levels[i - 1].name
    }
}