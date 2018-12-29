//next-steps:
// and link poem titles to their full text, somehow? but then how to "get back" to search results?
// OR add a CLICK function for titles to be clicked and for the array/lines to reveal below...? how??
// refactor the code--i can't need 3 almost identical functions, one for each button, i feel like it could be an if statement or something along those lines???

// variables for searching API
let inputField = '';
let searchTerm = '';
let baseUrl = `http://poetrydb.org/`

// button click functions for each search type
$('#author').click(function () {
    event.preventDefault();
    let inputField = 'author';
    // console.log(inputField);
    let newHTML = ` 
    <form id = "search">
    <input id="search-input" type="text" placeholder="Walt Whitman" />
    <button type="submit" id="search-button">Find Poems!</button> `;
    $('.poem-info').html(newHTML)
    $('#search').submit((event) => {
        event.preventDefault();
        let searchTerm = $('#search-input').val();
        const poemUrl = `http://poetrydb.org/${inputField}/${searchTerm}`
        $.getJSON(poemUrl, (poemSearch) => {
            if (poemSearch.status == 404) {
                let newHTML = `<p> No poems found by that author. </p>`;
                $('.search-results').html(newHTML)
            } else {
                let newHTML = `<h3 class="results-title">Poems by ${poemSearch[0].author}</h3>
                                <div class="poems-by-author-container">`;
            
                for (let i = 0; i < poemSearch.length; i ++) {
                    console.log("i")
                    let poemTitle = poemSearch[i].title;
                    newHTML += `
                    <a><div class="poems-by-author">${poemTitle}</div></a>`
                }
            // for (let j = 0; j < poemSearch.length; j++) {
            //     console.log("j")
            //     let poemTitle = poemSearch[j].title
            //     let poemLines = poemSearch[j].lines[j]
            //     console.log (poemTitle, poemLines)
                
            // }
        
            // above i'm trying to figure out a way to add a click function to show the actual poem when clicked... 
            // the separate loop isn't accessing the array, though, and a nested loop creates a massive amount of iterations that slows down the search/page load...
            newHTML += `</div>`
        

            $('.search-results').html(newHTML)

            }
        
        })

    })

})


$('#title').click(function () {
    event.preventDefault();
    let inputField = 'title';
    // console.log(inputField);
     let newHTML = ` 
    <form id = "search">
    <input id="search-input" type="text" placeholder="A lover's complaint" />
    <button type="submit" id="search-button">Find Poems!</button> `;
    $('.poem-info').html(newHTML)
    $('#search').submit((event) => {
        event.preventDefault();
        let searchTerm = $('#search-input').val();
        const poemUrl = `http://poetrydb.org/${inputField}/${searchTerm}`
        $.getJSON(poemUrl, (poemSearch) => {
            if (poemSearch.status == 404) {
                let newHTML = `<p> No poems found by that title </p>`;
                $('.search-results').html(newHTML)
            } else {
                let newHTML = `<h3> Poems that match this title </h3>
                                <div class="poems-by-title-container>`;
                for (let i = 0; i < poemSearch.length; i++) {
                    newHTML += `<div class="poem-title">${poemSearch[i].title}</div>
                                <div class="by"> by ${poemSearch[i].author} </div>
                                <div class="poem-lines-container">`
                                for (let j = 0; j < Number(poemSearch[i].linecount); j++) {
                                    newHTML +=
                                    `<div class="poem-lines">${poemSearch[i].lines[j]}</div>`
                                }
                                newHTML += `</div> </div>`
                    }
                $('.search-results').html(newHTML)
                }
        })

    })

})

$('#lines').click(function () {
    event.preventDefault();
    let inputField = 'lines';
    console.log(inputField);
     let newHTML = ` 
    <form id = "search">
    <input id="search-input" type="text" placeholder="The lone and level sands stretch far away" />
    <button type="submit" id="search-button">Find Poems!</button> `;
    $('.poem-info').html(newHTML)
    $('#search').submit((event) => {
        event.preventDefault();
        let searchTerm = $('#search-input').val();
        const poemUrl = `http://poetrydb.org/${inputField}/${searchTerm}`
        $.getJSON(poemUrl, (poemSearch) => {
            if (poemSearch.status == 404) {
                let newHTML = `<p> No poems found with those lines. </p>`;
                $('.search-results').html(newHTML)
            } else {
                let newHTML = `<h3> Poems that include these lines </h3>`
                for (let i = 0; i < poemSearch.length; i++) {
                    newHTML += `<div class="poem-title">${poemSearch[i].title}</div>
                                <div class="by"> by ${poemSearch[i].author} </div>
                                <div class="poem-lines-container">`
                    for (let j = 0; j < Number(poemSearch[i].linecount); j++) {
                        newHTML +=
                            `<div class="poem-lines">${poemSearch[i].lines[j]}</div>`
                    }
                }
            $('.search-results').html(newHTML)
            }
        })

    })

})




