// 得到数据的HTML
let axios = require('axios');
async function getMoviesHtml() {
    let resp = await axios.get('https://movie.douban.com/chart')
    return resp.data;
}

// 将html转换为JQ对象

let cheerio = require('cheerio');
async function getMovies() {
    let html = await getMoviesHtml()
    let $ = cheerio.load(html);

    let trs = $("tr.item");
   let arr =[];
    for (let i = 0; i < trs.length; i++) {
        // 对每个tr进行提取得到数据对象
        let tr = trs[i];
        // console.log(tr)
        let item = getItem($(tr));
        arr.push(item);
    }
    // console.log(arr)
    return arr;
}

function getItem(tr) {
    let name = tr.find("div.pl2 a").text();
    // var name = tr.find("div.pl2 a").text();
// console.log(name,'1')

    name = name.replace(/\s/g, "");
    name = name.split("/")[0];
// console.log(name,'oo')
    let imgStr = tr.find("img").attr('src');
    let content = tr.find("p.pl").text();
    // console.log(content)
    return {
        name,
        imgStr,
        content
    }

}
module.exports = getMovies; 