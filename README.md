<h1>Teste agenda telefônica- Grupo Nos</h1>

<h3>Tecnologias usadas no projeto</h3>
Ambiente docker com framework docker-compose<br/>
Back-end NodeJs com framework Express.<br/>
npm gerenciador de pacotes </br>
MySql banco de dados </br>
Fetch para Curl 
<br/>

<h3>Requisitos para rodar projeto</h3>
Docker é extremamente necessário porque KEY do HgBrasil Weather
 esta declarada como variável de ambiente no dockerfile <strong>ENV KEY_WEATHER</strong>.<br/>
 Instale nodejs e npm para instalar dependencias.

<h3>Passo a passo para iniciar projeto 
<h4>1° Clone o projeto</h4> 
<pre>
git clone https://github.com/20100000/grupo-nos.git<br/>
cd grupo-nos
</pre>
<h4>2° Instale as dependências</h4>  
na raiz do projeto
crie node_module com as dependências.<br/>
<pre>
npm install
</pre>
<h4>3° Iniciar projeto</h4>
start back-end com docker-compose, a base de dados sera importada para detro do container porta 3306 tem que estar livre<br/>
<pre>
docker-compose up<br/>
</pre>
<h4>APIs</h4>
<h3>Criar contato</h3>
<pre>
curl -X POST \
  http://localhost:3000/schedule \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: a8b6f20f-f0c0-cf30-cd4b-b21e415c48ed' \
  -d '{
	"name": "Miguel",
	"email": "m@teste.com",
	"fones": [
		{
			"number": "444444444444"
		},
		{
			"number":"55555555555555"
		}
	],
	"addressLine": "rua teste 5",
	"addressNumber": "3577",
	"neighborhood": "jd 55",
	"city": "capivari 2",
	"state": "sp",
	"code": "13500-111"
}'
</pre>
<h3>Mudar contato</h3>
<pre>
curl -X PUT \
  http://localhost:3000/schedule/1 \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: c58db632-55c9-cb53-5031-496aa53ed571' \
  -d '{
	"name": "Mudar nome",
	"email": "mudar@teste.com",
	"fones": [
		{
			"id": 1,
			"number": "38975369"
		}
	],
	"addressLine": "rua teste teste",
	"addressNumber": "357",
	"neighborhood": "jd 3",
	"city": "campinas",
	"state": "sp",
	"code": "13100-110"
}'
</pre>

<h3>Pesquisar contato</h3>
<pre>
    curl -X POST \
      http://localhost:3000/schedule/search \
      -H 'cache-control: no-cache' \
      -H 'content-type: application/json' \
      -H 'postman-token: ef9199b3-8048-327d-9d50-9019ab6351f9' \
      -d '{
    	"find": "tiago"
    }'
</pre>
<h3>Deletar contato</h3>
<pre>
curl -X DELETE \
  http://localhost:3000/schedule/1 \
  -H 'cache-control: no-cache' \
  -H 'postman-token: 73c34e82-7e4c-a26b-9310-ddbbd6c452cb'
</pre>
<h3>Mostrar todos contatos</h3>
<pre>
http://localhost:3000/schedule
</pre>
<h3>Mostrar unico contato </h3>
<pre>
http://localhost:3000/schedule/1
</pre>
