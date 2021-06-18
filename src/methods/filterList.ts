import Article from "@/types/Articles";

function filterLists(newslist: Article[]) {
    newslist.sort(function (x, y) {
        const a = new Date(x.date);
        const b = new Date(y.date);
        return a.getTime() - b.getTime();
    });

    return newslist;


}

export default filterLists;