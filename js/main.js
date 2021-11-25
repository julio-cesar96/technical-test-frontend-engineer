
const API_KEY = "AIzaSyCJo1xgRsCxTP2eMcaj3ZxP4zn7IRTVu6I";

document.querySelector('.search').addEventListener('submit', async(event) => {
    event.preventDefault();

    let input = document.querySelector('#search__title').value;

    if (input !== '') {
        clearInformation();
        showWarning('Carregando...');

        let url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&part=snippet&q=${encodeURI(input)}`;

        let results = await fetch(url);
        let data = await results.json();
        console.log(data);

        if(results.status === 200) {
            showInformation({
                title: data.items[0].snippet.title,
                thumbnail: data.items[0].snippet.thumbnails.high.url,
                description: data.items[0].snippet.description,
                published: data.items[0].snippet.publishedAt
            });
        } else {
            clearInformation();
            showWarning("Desculpa, não enconstramos sua banda/artista favorito");
        }
    }
});

function showInformation(data) {
    showWarning('');


    document.querySelector('.result__title').innerHTML = `${data.title}`;
    document.querySelector('.result img').setAttribute('src', `${data.thumbnail}`);
    document.querySelector('.result img').setAttribute('alt', `${data.description}`);
    document.querySelector('.result__description').innerHTML = `${data.description}`;
    document.querySelector('.result__published').innerHTML = `${data.published}`;

    document.querySelector('.result').style.display = 'block';
}

