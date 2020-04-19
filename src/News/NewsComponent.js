export default async function News(parameter) {
    let url = "";
    let randomPick = 0;
    if (parameter) {
        //window.location.href
        url = window.location.href + "log.php?news=coronavirus";
    } else {
        url = window.location.href + "log.php?news=news";
    }
    let response = await fetch(url);
    let data = await response.json();

    if (data.status == 'ok' && data.totalResults > 0) {
        if (parameter) {
            randomPick = 20;
        } else {
            randomPick = data.totalResults;
        }
        var item = data.articles[Math.floor(Math.random() * randomPick)];
        var title = item.title;
        return title;
    }

    return data;
}