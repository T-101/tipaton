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

function start() {
    const day = alteredStartDate() ? alteredStartDate() : "01";
    return new Date(`2020-01-${day}T00:00`)
};

function end() {
    let then = start();
    then.setDate(then.getDate() + 31);
    return then
};

export function elapsedDays(that) {
    return Math.ceil((that.state.dateTime - start()) / 1000 / 60 / 60 / 24);
};

export function getPercent(that) {
    const janSeconds = end() - start();
    const secondsElapsed = that.state.dateTime - start()
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
