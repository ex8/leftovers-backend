# leftovers-backend
Leftovers Express App

## Docker

### Build
```
docker build -t leftovers-client .
```

### Run
```
docker run --name=client --network=leftovers-network --env-file .env -d -p 3000:3000 leftovers-client
```