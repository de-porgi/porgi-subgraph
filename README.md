# Porgi Subgraph

This repository contains the code for the Porgi Subgraph. The mainnet version of the sub graph is not ready, because it is test project and not final solution.
We have a big plans, so we will upgrade it and will change the structure of project. So it is not final entities and etc.

# TODO

- Add support of next seasons.
- Create User entity with info about votes and related projects.

# Build

To work with Graph we need install cli from them:
```
yarn global add @graphprotocol/graph-cli
```
To generate structure:
```
graph codegen
```
To deploy to local node:
```
graph deploy
```
More information how to work with `graph-cli` you can find in official [documentation]('https://thegraph.com/docs/define-a-subgraph#create-a-subgraph-project').