const axios = require('axios');


export async function googleScrape(search: string, site: string = '', start: number = 0): Promise<SearchResponseDto> {

    const q = `${search} site:${site}`

    var res = await axios({
        method: 'get',
        url: `https://www.google.com/search`,
        headers: {
            'accept': 'text/html',
            'referer': 'https://www.google.com/'
        },
        params: {
            q: q,
            start: start,
            gbv: 1,
        }
    });

    let data = res.data;

    let results = new Array<SearchItem>();

    const regexYTRecomended = /<a href="\/url\?q=(https:\/\/?[\w/\-?=%.]+)&(?:(?:.|\n)+?)<div class="kCrYT"><span><div class="BNeawe deIvCb AP7Wnd">(.+?)<\/div><\/span>/g;
    results = results.concat(match(data, regexYTRecomended));

    const regexMain = /<div class="ZINbbc xpd O9g5cc uUPGi"><div class="kCrYT"><a href="\/url\?q=(https:\/\/?[\w/\-?=%.]+)&(?:(?:.|\n)+?)<h3 class="zBAuLc"><div class="BNeawe vvjwJb AP7Wnd">(.+?)<\/div><\/h3>/g;
    results = results.concat(match(data, regexMain));

    let result: SearchResponseDto = { date: res.headers.date, results: results };
    return result;
};

function match(data: string, regex: RegExp): Array<SearchItem> {
    let matches = data.matchAll(regex);

    let result = new Array<SearchItem>()

    for (const match of matches) {
        result.push({ url: decodeURIComponent(match[1]), name: decodeURIComponent(match[2]) });
    }

    return result;
}

export interface SearchResponseDto {
    date: Date;
    results: Array<SearchItem>
}

export interface SearchItem {
    url: string;
    name: string;
}