# App ngcash
Esse projeto foi desenvolvido para o processo seletivo da ngcash em parceria com a trybe. O desafio consiste em estruturar uma aplicação web fullstack, dockerizada, cujo objetivo seja possibilitar que usuários da NG consigam realizar transferências internas entre si.

## Instruções para rodar localmente o app
Faça download do repositorio:

    git clone git@github.com:ts-dart/app-ngcash.git

#### 1 - Iniciar banco de dados
Abra o terminal na raiz do projeto e execute: "npm run db"

esse comando cria um container docker que sera o banco de dados, e necessário configurar o banco de dados

* passo 1 - no terminal execute o código a seguir: "docker logs db 2>&1 | grep GENERATED", copie o código que sera retornado.

* passo 2 - em seguida execute o seguinte código: "docker exec -it db mysql -uroot -p", sera solicitada uma senha, o código gerado no passo 1 sera essa senha.

* passo 3 - você sera redirecionado para dentro do container, execute o seguinte código: "ALTER USER 'root'@'localhost' IDENTIFIED BY '12345';". 

* passo 4 - ultimo passo, execute o seguinte código: "update mysql.user set host = '%' where user='root';".

* passo 5 - Dê um ctrl-D e depois um docker restart db.

#### 2 - Iniciar backend
Na raiz do projeto execute: "npm run backend"

#### 3 - Iniciar frontend
Em um outro terminal na raiz do projeto execute: "npm run frontend"
