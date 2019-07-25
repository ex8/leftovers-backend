# leftovers-backend
Leftovers Express App

## Docker

### Build
```
docker build -t leftovers-server .
```

### Run
```
docker run --name=server --network=leftovers-network --env-file .env -d -p 4000:4000 leftovers-server
```