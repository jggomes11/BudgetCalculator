# BudgetCalculator

## Executar o backend

1. Buildar
    ```bash
    docker build --tag node-docker
    ```
2. Executar
    ```bash
    docker run --publish 8000:8000 node-docker
    ```

- Se der algum problema excluir a build e refazer os passos
  ```bash
  docker rm $(docker ps -aq)
  ```

## Executar o frontend
1. Tenha o npm instalado, se não tiver segue o [link](https://medium.com/@iam_vinojan/how-to-install-node-js-and-npm-using-node-version-manager-nvm-143165b16ce1) de um tutorial

2. Instalar o yarn npm 
    ```bash
    npm install --global yarn
    ```

3. Instalar dependências
    ```bash
    yarn install
    ```
4. Executar
    ```bash
    yarn start
    ```

## Como usar?
Preencha os campos, se desejar adicione ou exclua alguns campos e clique em calcular para gerar o gráfico.

Já deixei alguns registros adicionados para facilitar.