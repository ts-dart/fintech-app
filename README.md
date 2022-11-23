#### 1 - Descompactar arquivo

#### 2 - Iniciar banco de dados
Abra o terminal na raiz do projeto e execute: "npm run db"

esse comando cria um container docker que sera o banco de dados, e nessecario configurar o banco de dados

* passo 1 - no terminal cole o codigo a seguir: "docker logs seu-container 2>&1 | grep GENERATED", copie o codigo que sera retornado.

* passo 2 - em seguida cole o seguinte codigo: "docker exec -it seu-container mysql -uroot -p", sera solicitada uma senha, cole o codigo gerado no passo 1.

* passo 3 - voce sera redirecionado para dentro do container, la dentro cole o seguinte codigo: "ALTER USER 'root'@'localhost' IDENTIFIED BY '12345';
". 

* passo 4 - ultimo passo, execute o seguinte codigo: "update mysql.user set host = '%' where user='root';
".

#### 3 - Iniciar backend
Abra o terminal na raiz do projeto e execute: "npm run backend"

#### 3 - Iniciar frontend
Abra o terminal na raiz do projeto e execute: "npm run frontend"