
//Get Articles to managepost
$(document).ready(function () {

    $.ajax({
        url: "https://jsonplaceholder.typicode.com/posts",
        Type: "GET",
        success: function (resp) {


            for (var i = 0; i < resp.length; i++) {
                var postRow = $('<tr>').addClass('post-row').attr('id', resp[i].id);
                var postname = $('<td>').addClass('post-name');
                var postcontent = $('<td>').addClass('post-content');
                var postAction = $('<td>').addClass('post-action');
                var deleteBtn = $('<button>').html('Delete').addClass('delete');
                var editBtn = $('<a>').html('Edit').addClass('edit');
                $('tbody').append(postRow);
                $('#' + resp[i].id).append(postname);
                $('#' + resp[i].id).append(postcontent);
                $('#' + resp[i].id).append(postAction);
                $(postAction).append(deleteBtn);
                $(postAction).append(editBtn);
                $('#' + resp[i].id).children('.post-name').text(resp[i].id + resp[i].title);
                $('#' + resp[i].id).children('.post-content').text(resp[i].body);

                //get delete Data
                if (localStorage.getItem('deleteuserId ' + resp[i].id)) {
                    if (localStorage.getItem('deleteuserId ' + resp[i].id) == resp[i].id) {
                        $('#' + resp[i].id).remove();
                    }
                }

                //Get Edit Data
                var editData = JSON.parse(localStorage.getItem('editData ' + resp[i].id));
                if (editData) {
                    if (editData.id == resp[i].id) {
                        $('#' + resp[i].id).children('.post-name').text(editData.title);
                        $('#' + resp[i].id).children('.post-content').text(editData.body);
                    }
                }
                //add id to dutton and edit 
                deleteBtn.attr('id', resp[i].id);
                editBtn.attr('id', resp[i].id);
            }

            //edit post
            $('.edit').on('click', function () {
                var edituserId = $(this).attr('id');
                localStorage.setItem("editId", edituserId);
                $(this).attr('href', 'editpost.html');
            })


            //delete post 
            $('.delete').on('click', function () {
                var deleteConfirm = confirm("Are you sure to delete");
                if (deleteConfirm) {
                    var deleteuserId = $(this).attr('id');
                    $.ajax({
                        url: 'https://jsonplaceholder.typicode.com/posts/' + deleteuserId,
                        Type: 'DELETE',
                        success: function (resp) {
                            console.log(resp);
                        },
                        error: function (err) {
                            console.log(err);
                        }
                    });
                    localStorage.setItem("deleteuserId " + deleteuserId, deleteuserId);
                    $(this).parent().siblings().parent().remove('.post-row');
                }
            })
            console.log(resp);
        },
        error: function (err) {
            console.log(err);
        }
    });
})




