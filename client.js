const grpc = require("@grpc/grpc-js");
var messages = require('./todo_pb');
var services = require('./todo_grpc_pb');
var parseArgs = require('minimist');

const client = new services.TodoClient("localhost:50051", grpc.credentials.createInsecure());
const request = new messages.TodoItem();
const VoidNoParam = new messages.VoidNoParam();


function main() {
    var argv = parseArgs(process.argv.slice(2), {
      string: 'todo'
    });
    let greatestId = 2;
    client.readTodos(VoidNoParam, (err, response)=> {
        response.array[0].forEach(element => {
            console.log(greatestId);
            if(greatestId <= element[0]){
                greatestId = element[0] + 1
            }
            console.log("todo:", element);
        });
        let todo;
        if (argv.todo) {
          todo = argv.todo; 
        } else {
          todo = 'Undefined';
        }
        request.setId(greatestId);
        request.setText(todo);
        client.createTodo(request, function(err, response) {
            console.log("todo created:", response.array);
          });
    
    })
  }
  
  main();
  