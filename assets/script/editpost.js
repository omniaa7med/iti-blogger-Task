
//edit posts 
$(document).ready(function () {
    var user = localStorage.getItem('editId');
    var dataArr = [];

    $.ajax({
        url: "https://jsonplaceholder.typicode.com/posts/" + user,
        Type: "GET",
        success: function (resp) {

            $('.editname').html(resp.title).attr('id', user);
            $('.editcontent').html(resp.body).attr('id', user);

            //check textarea-fileds
            $('.textarea').on('change', function () {
                if ($('.editname').val() == "" || $('.editcontent').val() == "") {
                    $('.submit').css({'pointer-events':'none','cursor': 'default'});
                }
            })

            //save data of update
            $('.submit').on('click', function (e) {
                $(this).attr('id', user);
                // e.preventDefault();
                $.ajax({
                    url: 'https://jsonplaceholder.typicode.com/posts/' + user,
                    Type: 'PUT',
                    success: function (resp) {
                        var editname = $('.editname').val();
                        var editContent = $('.editcontent').val();

                        var obj = {
                            id: user,
                            title: editname,
                            body: editContent
                        }
                        
                        localStorage.setItem('editData ' + user, JSON.stringify(obj));
                        $('.submit').attr('href', 'manageposts.html');
                        console.log(resp);
                    },
                    error: function (err) {
                        console.log(err);
                    }
                });
            })
        },
        error: function (err) {
            console.log(err);
        }
    });
})

