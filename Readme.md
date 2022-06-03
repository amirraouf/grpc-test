Run
```bash
grpc_tools_node_protoc --js_out=import_style=commonjs,binary:. --grpc_out=grpc_js:. todo.proto

python -m grpc_tools.protoc -I . --python_out=. --grpc_python_out=. ./todo.proto
```

then run in a terminal
```
python server.py
```
and in another terminal

```
node client.js
```

