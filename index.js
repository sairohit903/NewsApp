const api_key = "09c96d3572a34464b7a99d4cbb22b503";
const url = "http://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("india"));

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${api_key}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles) {
    const newSection = document.getElementById("news-section");
    const newSectiontemplate = document.getElementById("news-section-template");

    newSection.innerHTML = '';

    articles.forEach((article) => {
        if (article.urlToImage == null) return;
        const boxClone = newSectiontemplate.content.cloneNode(true);
        fillDataInCard(boxClone, article);
        newSection.appendChild(boxClone);
    });

}

function fillDataInCard(boxClone, article) {
    const newsImage = boxClone.querySelector("#news-image");
    const newsTitle = boxClone.querySelector("#news-title");
    const newsSource = boxClone.querySelector("#news-source");
    const newsDescripton = boxClone.querySelector("#news-description");

    newsImage.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDescripton.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} : ${date}`;

    boxClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

let currNavitem = null;
function onClickNavItem(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    if (!currNavitem) {
        currNavitem.classList.remove("active");
        currNavitem = navItem;
        currNavitem.classList.add("active");
    }
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-box");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
});
