const form = document.querySelector('#searchForm');
form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const searchTerm = this.elements.query.value;
    const queryString = 'https://api.tvmaze.com/search/shows?q=' + searchTerm;

    let response = await axios.get(queryString);
    
    let data = response.data;
    console.log(data);
    data.sort(sortByRatingDesc);
    for (let i = 0; i < data.length; i++){
        console.log(`Title: ${data[i].show.name}`);
        //console.log(`Image: ${data[i].show.image.medium}`);
        console.log(`Premiered: ${data[i].show.premiered}`);
        console.log(`Rating: ${data[i].show.rating.average}`);

        let img = document.createElement('IMG');
        if (data[i].show.image === null) {
            img.src = "";
            img.style.height = "295px";
            img.style.width = "210px";
        } else {
            img.src = data[i].show.image.medium;
        }
        
        document.body.append(img);
    }

});

function sortByRatingDesc(firstEl, secondEl) {
    if (firstEl.show.rating.average === secondEl.show.rating.average) {
        return 0;
    } else if (firstEl.show.rating.average > secondEl.show.rating.average) {
        return -1;
    } else {
        return 1;
    }
}

//(Object.keys(response.data).length)
// sort(sortByRatingDesc(response.data));