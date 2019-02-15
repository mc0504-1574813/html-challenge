'use strict';

$(document).ready(function () {
    $("#filterBy").change(function () {
        if ($('filterBy').val() === "userId") {
            $("#number").attr("max", "10");
        } else {
            $("#number").attr("max", "100");
        }
    })
})

let fetched = fetch('https://jsonplaceholder.typicode.com/posts')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        return data;
    })
    .catch(function (error) {
        console.error(error);
    })

$('#submit').click(function (event) {
    event.preventDefault();
    renderSearch(filtering(fetched));
})

function ofType(post) {
    if ($('#filterBy').val === "userId" && post.userId === $('#number')) {
        return true;
    } else if ($('#filterBy').val === "id" && post.id === $('#number')) {
        return true;
    } else {
        return false;
    }
}

function filtering(posts) {
    let filtered = [];
    for (let i = 0; i < posts.length; i++) {
        if (ofType(posts[i])) {
            filtered.push(posts[i]);
        }
    }
    return filtered;
}

function renderOneResult(oneResult) {
    let div = $('<tr>');
    $('table').append(div);
    div.append('<td>' + oneResult.userId + '</td>');
    div.append('<td>' + oneResult.id + '</td>');
    div.append('<td>' + oneResult.title + '</td>');
    div.append('<td>' + oneResult.body + '</td>');
}

function renderSearch(results) {
    $('tr').not(':first').remove();
    results.forEach(renderOneResult);
}



