# template-docker-nodejs

## To Install
```bash
git clone git@githib.com:/imkitae/template-docker-nodejs.git
cd template-docker-nodejs
yarn install
```

## To run
```bash
# Set environment variables
cp .env.template .env

docker-compose up -d    # Create a container in background mode
docker-compose logs -f  # Watch logs
docker-compose down     # Destroy the container
```

## To do
- [ ] Apply Webpack to server src (optional)
- [ ] Set Typescript (optional)
- [ ] Set Test
- [ ] Set CI/CD
- [ ] Include external infrastructure resources
