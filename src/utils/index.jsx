export function getJsonFromUrl(url) {
    if (!url) url = window.location.search;
    let query = url.substr(1);
    let result = {};
    query.split("&").forEach(function (part) {
        const item = part.split("=");
        result[item[0]] = decodeURIComponent(item[1]);
    });
    return result;
}

export function alteredStartDate() {
    const params = getJsonFromUrl();
    return "start" in params && Number(params.start) && Math.abs(params.start) < 365
        ? Number(params.start)
        : 0
}

function leftPad(number) {
    return number < 10 ? "0" + number : number
}

export function start() {
    const year = new Date().getFullYear()
    let date = new Date(`${year}-01-01T00:00`)
    date.setDate(date.getDate() + alteredStartDate())
    if (date.getFullYear() < year) date.setFullYear(date.getFullYear() + 1)
    return date
}

export function end() {
    let then = start();
    then.setDate(then.getDate() + 31);
    return then
}

export function showCountdownCard(altered) {
    return new Date().getMonth() === 11 && !altered
}

export function renderCountdown(date) {
    const nextYear = date.getFullYear() + 1
    let countdownTo = new Date(`${nextYear}-01-01T00:00`)
    let delta = Math.abs(countdownTo - date) / 1000
    const days = Math.floor(delta / 86400)
    delta -= days * 86400
    const hours = leftPad(Math.floor(delta / 3600) % 24);
    delta -= hours * 3600;
    const minutes = leftPad(Math.floor(delta / 60) % 60);
    delta -= minutes * 60;
    const seconds = leftPad(Math.floor(delta % 60));
    return (
        <div>
            {days > 0 && <span className="countdownElement">{days}d</span>}
            <span className="countdownElement">{hours}h</span>
            <span className="countdownElement">{minutes}m</span>
            <span className="countdownElement">{seconds}s</span>
        </div>

    )
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
        {percent: 13.5, name: "Château d'Armailhac"},
        {percent: 15, name: "Vermouth Bianco"},
        {percent: 15.5, name: "Hartwall Original Long Shot"},
        {percent: 16, name: "Kilju"},
        {percent: 17, name: "Baileys"},
        {percent: 18, name: "Puolukkavodka Cocktail"},
        {percent: 19, name: "Royal Salmiakki Snapsi"},
        {percent: 20, name: "Kahvilikööri"},
        {percent: 21, name: "Gambina"},
        {percent: 22, name: "Hehkuviini"},
        {percent: 24, name: "Heering Cherry"},
        {percent: 25, name: "Grönstedts Sidecar"},
        {percent: 26, name: "One Margarita carton package"},
        {percent: 27, name: "Saunalahden Viina"},
        {percent: 28, name: "Disaronno Originale"},
        {percent: 30, name: "Galliano"},
        {percent: 31, name: "Licor 43 Cuarenta y Tres"},
        {percent: 32, name: "Salmiakkikossu"},
        {percent: 33, name: "Fireball"},
        {percent: 35, name: "Jägermeister"},
        {percent: 36, name: "Corona Finest Napoleon"},
        {percent: 37, name: "Concorde XO"},
        {percent: 37.5, name: "Kopparberg Premium Gin Strawberry & Lime"},
        {percent: 38, name: "Koskenkorva"},
        {percent: 39, name: "Fernet Branca"},
        {percent: 40, name: "Russian Standard"},
        {percent: 41, name: "Jaloviina Extra"},
        {percent: 41.5, name: "Sierra Milenario Extra Añejo Tequila"},
        {percent: 42, name: "Smakbyns Apelbrand"},
        {percent: 43, name: "Lagavulin"},
        {percent: 43.7, name: "Ägräs Akvavit"},
        {percent: 44, name: "Hammer & Son Gin"},
        {percent: 45, name: "Maker's Mark"},
        {percent: 45.7, name: "Michter's Small Batch Bourbon"},
        {percent: 45.8, name: "Talisker 10 Year Old Single Malt"},
        {percent: 46, name: "Ollinmäen Marjapontikka"},
        {percent: 46.3, name: "Napue Gin"},
        {percent: 46.6, name: "Ardbeg An Oa Single Malt"},
        {percent: 46.9, name: "Sirene Absinthe"},
        {percent: 48, name: "Laphroaig Quarter Cask Single Malt"},
        {percent: 48.3, name: "Balvenie Peat Week 14 Year Old 2003 Single Malt"},
        {percent: 48.4, name: "Bruichladdich Black Art Edition 07.1 Unpeated Islay Single Malt 1994"},
        {percent: 50, name: "Minttuviina"},
        {percent: 51.5, name: "Marca Negra Mezcal"},
        {percent: 54, name: "Stroh"},
        {percent: 55, name: "Macallan Classic Cut"},
        {percent: 56.7, name: "Bowmore The Devil's Cask III Single Malt"},
        {percent: 57, name: "Plymouth Gin Navy Strength"},
        {percent: 57.1, name: "Ardbeg Corryvreckan Single Malt"},
        {percent: 59.1, name: "Octomore 09.1 Single Malt"},
        {percent: 59.3, name: "Octomore 08.1 Single Malt"},
        {percent: 59.8, name: "Octomore 10.1 Single Malt"},
        {percent: 60, name: "Kaatoryyppy"},
        {percent: 62, name: "Lucid Absinthe"},
        {percent: 63.3, name: "Highland Park Cask Strength Single Malt"},
        {percent: 64, name: "De Kuyper Original Elixirs Orange"},
        {percent: 68, name: "Pernod Absinthe"},
        {percent: 69, name: "Clarke's Court Spicy Rum"},
        {percent: 70, name: "King of Spirits Absinthe"},
        {percent: 75.5, name: "Bacardi 151"},
        {percent: 80, name: "John Crow Batty Rum"},
        {percent: 88, name: "Balkan 176 Vodka"},
        {percent: 88.8, name: "Pincer Shanghai Strength"},
        {percent: 90, name: "River Antoine Royale Rum"},
        {percent: 92, name: "Bruichladdich X4"},
        {percent: 95, name: "Everclear"},
        {percent: 96, name: "Spiritus Fortis"},
        {percent: 100, name: "Elysium"}
    ]
    for (let i = 0; i < levels.length; i++) {
        if (percent < levels[i].percent) return levels[i - 1].name
    }
}

export function developerCracked(dateString) {
    if (!dateString) return false
    const date = new Date(dateString)
    return date > start() ? date : false
}
