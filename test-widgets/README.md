## Run tasks

To run the dev server for frontend and backend

```sh
npx nx run-many --target=serve --projects=my-app,api --parallel
```

To create a production bundle:

```sh
npx nx build my-app
```

## Seed data
```sh
curl --location 'http://localhost:3000/contacts' \
--header 'Content-Type: application/json' \
--data '{
    "firstName": "Jonh",
    "lastName": "Doe",
    "phoneNumber": "+1234567890"
}'
```