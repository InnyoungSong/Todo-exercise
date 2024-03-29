
$(document).ready(function() {
    var table = $("#todo-list");
    var newTodo = $("#new-todo");
    var tasks

/////FUNCTIONS
    var renderTodos = function(){
        $.ajax({
            type: 'GET',
            url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=1227',
            dataType: 'json',
            success: function (response, textStatus) {
                console.log(response)
                tasks = response.tasks;
                tasks.forEach(function(task){
                    var taskName = task.content;
                    var taskid = task.id;
                    console.log(taskName);
                    createTableRow(taskName, taskid);
                })

            // response is a parsed JavaScript object instead of raw JSON
            },
            error: function (request, textStatus, errorMessage) {
            console.log(errorMessage);
            }
        });
    }
    var createTableRow = function(todo, id){
        table.append('<div class="row"></div>');
        var newTableRow = table.find($(".row:last-child"));
        newTableRow.append('<div class="col-8" taskid="' + id + '"><p>' + todo + '</p></div>');
        newTableRow.append('<div class="col-2"><button class="done-button btn">Done</button></div>');
        newTableRow.append('<div class="col-2"><button class="remove-button btn">remove</button></div>');
    };

//////INITIAL RENDER OF TODOS
    renderTodos();

//////BUTTON EVENTS
    $("#add-new-todo").on("click", function(event){
        event.preventDefault();
        var newTodo = $('#new-todo').val();
        var newTodoId;
        
        $.ajax({
            type: 'POST',
            url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=1227',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({
              task: {
                content: newTodo
              }
            }),
            success: function (response, textStatus) {
                newTodoId = response.task.id;
              console.log(response, newTodoId);
            },
            error: function (request, textStatus, errorMessage) {
              console.log(errorMessage);
            }
          });
          
 
        createTableRow(newTodo, newTodoId)

    })

    $("#todo-list").on("click", ".remove-button", function(event){
        event.preventDefault();
        var targetRow = $(this).closest(".row");
        var target = targetRow.find('[taskid]');
        var targetid = target.attr('taskid');
        
        targetRow.remove();
        $.ajax({
            type: 'DELETE',
            url: 'https://fewd-todolist-api.onrender.com/tasks/' + targetid +'?api_key=1227',
            success: function (response, textStatus) { 
                console.log(response);
            },
            error: function (request, textStatus, errorMessage) {
              console.log(errorMessage);
            }
        }); 
    })

    $("#todo-list").on("click", ".done-button", function(event){
        event.preventDefault();
        var targetRow = $(this).closest(".row");
        var target = targetRow.find('[taskid]');
        var targetid = target.attr('taskid');
        $(this).toggleClass("done-button");
        $(this).toggleClass("active-button");
        $(this).html('Active')

        $.ajax({
            type: 'PUT',
            url: 'https://fewd-todolist-api.onrender.com/tasks/' + targetid + '/mark_complete?api_key=1227',
            contentType: 'application/json',
            dataType: 'json',
            success: function (response, textStatus) {
              console.log(response);
            },
            error: function (request, textStatus, errorMessage) {
              console.log(errorMessage);
            }
          });
    })

    $("#todo-list").on("click", ".active-button", function(event){
        event.preventDefault();
        var targetRow = $(this).closest(".row");
        var target = targetRow.find('[taskid]');
        var targetid = target.attr('taskid');
        $(this).toggleClass("done-button");
        $(this).toggleClass("active-button");
        $(this).html('Done')

        $.ajax({
            type: 'PUT',
            url: 'https://fewd-todolist-api.onrender.com//tasks/' + targetid + '/mark_active?api_key=1227',
            contentType: 'application/json',
            dataType: 'json',
            success: function (response, textStatus) {
              console.log(response);
            },
            error: function (request, textStatus, errorMessage) {
              console.log(errorMessage);
            }
          });
    })
}); 
