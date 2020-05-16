export default async function News(parameter) {
    let url = window.location.href;
    let debugUrl = "https://www.elegantweb.it/ChatBot/";
    url=debugUrl;
    let randomPick = 0;
    if (parameter) {
        //window.location.href

        url +=  "log.php?news=coronavirus";
    } else {
        url +=  "log.php?news=news";
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