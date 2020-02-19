
//Get Articles to blog
$(document).ready(function () {
    $.ajax({
        url: "https://jsonplaceholder.typicode.com/posts",
        Type: "GET",
        success: function (resp) {
            var blogArticles = $('<article>');
            $('body').append(blogArticles);
            for (var i = 0; i < resp.length; i++) {
                var blogsection = $('<section>').addClass('blog-article-item').attr('id', resp[i].id);
                $(blogArticles).append(blogsection);
                $('#' + resp[i].id).html(resp[i].id + '  ' + resp[i].title + resp[i].body);

                //get Delete 
                if (localStorage.getItem('deleteuserId ' + resp[i].id)) {
                    if (localStorage.getItem('deleteuserId ' + resp[i].id) == resp[i].id) {
                        $('#' + resp[i].id).remove();
                    }
                }

                //get Edit Data
                var editData = JSON.parse(localStorage.getItem('editData ' + resp[i].id));
                if (editData) {
                    if (editData.id == resp[i].id) {
                        $('#' + resp[i].id).html(editData.title + editData.body);
                    }
                }
            }

            console.log(resp);
        },
        error: function (err) {
            console.log(err);
        }
    });
})