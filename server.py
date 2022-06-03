from cgitb import text
from concurrent import futures

import todo_pb2_grpc
import todo_pb2

import grpc


TODOS = [{"id": 1, "text": "laundry"}]

class TodoServicer(todo_pb2_grpc.TodoServicer):

    def readTodos(self, request, context):
        print(TODOS)
        return todo_pb2.TodoItems(items=TODOS)
    
    def createTodo(self, request, context):
        TODOS.append({"id":request.id, "text":request.text})
        return todo_pb2.TodoItem(id=request.id, text=request.text)


def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    todo_pb2_grpc.add_TodoServicer_to_server(
        TodoServicer(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    server.wait_for_termination()


if __name__ == '__main__':
    serve()
