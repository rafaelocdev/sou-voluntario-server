<h1 align="center"><strong>Sou Voluntário - API</strong></h1>

Está é uma fake API criada utilizando as bibliotecas json-server e json-server-auth, para atender as necessidades da aplicação Sou Voluntário, que é basicamente um sistema que conecta pessoas que querem prestar serviço voluntário a instituições que necessitam deste tipo de trabalho.

<br/>
<br/>

<h2 align="center"><strong>URL Base</strong></h2>
<p align="center">https://sou-voluntario-server.herokuapp.com/</p>

<br/>
<br/>

<h2 align="center"><strong>Endpoints</strong></h2>

Esta API possui um total de 14 endpoints destinados a cadastro, login e atualização de cadastro tanto de voluntários como de instituições, listar voluntários e instituições cadastradas, permitir que instituições criem, atualizem e deletem eventos, listar todos os eventos, listar eventos criados pela instituição logada, permitir que voluntários se inscrevam em eventos bem como listar todos os eventos em que o usuário logado está inscrito.

<br/>
<br/>

<h2 align="center">Endpoints que não necessitam de autenticação</h2>

<br/>

- ## _Criação de usuário Voluntário_

  -> POST /signup - Formato da requisição:

  ```json - body
  {
    "email": "johndoe@mail.com",
    "password": "123456",
    "name": "John Doe",
    "userType": "voluntary"
  }
  ```

  -> Status code 201 - Formato da resposta:

  ```json - body
  {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5kb2VAbWFpbC5jb20iLCJpYXQiOjE2NDMyNzU1MTgsImV4cCI6MTY0MzI3OTExOCwic3ViIjoiNSJ9.8RGVliYVxraB28uvKYLuYihDSpRFwPFFrzRNtfODWWU",
    "user": {
      "email": "johndoe@mail.com",
      "name": "John Doe",
      "userType": "voluntary",
      "id": 5
    }
  }
  ```

<br/>

- ## _Criação de usuário Instituição_

  -> POST /signup - Formato da requisição:

  ```json - body
  {
    "email": "ong@mail.com",
    "password": "123456",
    "name": "Organização Não Governamental - ONG",
    "userType": "ong",
    "category": "education",
    "cep": "12345-678"
  }
  ```

  -> Status code 201 - Formato da resposta:

  ```json - body
  {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im9uZzFAbWFpbC5jb20iLCJpYXQiOjE2NDMyODAyNTQsImV4cCI6MTY0MzI4Mzg1NCwic3ViIjoiNiJ9.4qDQdZYUCXOktokuVTO397oVlqopnVV8UforYnZySz0",
    "user": {
      "email": "ong1@mail.com",
      "name": "ONG1",
      "userType": "ong",
      "category": "education",
      "ceṕ": "12345-678",
      "id": 6
    }
  }
  ```

  -> Possíveis erros

  - "Email already exists" -> Email já cadastrado;
  - "Email and password are required" -> Caso o campo de email ou senha não esteja presente no campo da requisição.

<br/>
<br/>

- ## _Login de Voluntários e Instituições_

  -> POST /signin - Formato da requisição:

  ```json - body
  {
    "email": "johndoe@mail.com",
    "password": "123456"
  }
  ```

  -> Status code 200 - Formato da resposta:

  ```json - body
  {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5kb2VAbWFpbC5jb20iLCJpYXQiOjE2NDI2OTIzODQsImV4cCI6MTY0MjY5NTk4NCwic3ViIjoiMyJ9.cElHg0CvBZx_aCyw1Utuqp7AXjcQUXyLpjE6UvQ0NCw",
    "user": {
      "email": "johndoe@mail.com",
      "name": "John Doe",
      "userType": "ong",
      "id": 1
    }
  }
  ```

  -> Possíveis erros

  - "Cannot find user" -> Email não cadastrado ou digitado incorretamente;
  - "Incorrect password" -> Senha digitada incorretamente.

<br/>
<br/>

- ## _Listagem de todos os Eventos_

  -> GET /events - Formato da requisição: sem corpo

  -> Status code 201 - Formato da resposta:

  ```json
  [
    {
      "title": "Agente de Biblioteca ",
      "description": "Buscamos pessoa para colaborar na organização, catalogação de uma biblioteca organizada e para mantê-la aberta. Vamos juntos!",
      "workType": "donation",
      "donationGoal": 0,
      "amountDonated": 0,
      "category": "education",
      "state": "São Paulo",
      "completed": false,
      "necessaryVoluntaries": 10,
      "voluntaries": [],
      "userId": "1",
      "id": 1
    },
    {
      "title": "Agente de Biblioteca 5",
      "description": "Buscamos pessoa para colaborar na organização, catalogação de uma biblioteca organizada e para mantê-la aberta. Vamos juntos!",
      "workType": "donation",
      "donationGoal": 0,
      "amountDonated": 0,
      "category": "education",
      "state": "São Paulo",
      "completed": false,
      "necessaryVoluntaries": 10,
      "voluntaries": [],
      "userId": "1",
      "id": 2
    }
  ]
  ```

<br/>
<br/>

<h2 align="center">Endpoints que necessitam de autenticação</h2>

<br/>

Para este tipo de endpoint é necessário enviar o token de acesso no header da requisição da seguinte maneira:

```js - header
{
  headers: {
    Authorization: `Bearer ${token}`;
  }
}
```

<br/>
<br/>

- ## _Voluntários_

  - ### _Listagem de todos os Voluntários_

    -> GET /users?userType_like=voluntary - Formato da requisição: sem corpo

    -> Status code 201 - Formato da resposta:

    ```json
    [
      {
        "email": "johndoe1@mail.com",
        "password": "$2a$10$s6qGUM5J7ovRU3n/C9f/JeskQRXlnBgPdFb9DftTPtLQTXoTBbhXC",
        "name": "John Doe 1",
        "userType": "voluntary",
        "id": 2
      },
      {
        "email": "johndoe2@mail.com",
        "password": "$2a$10$NVe7mjwP4yM6lk7IO2XsX.OqzA3zFv64zH7Zv6lxnHG/um0uEbIDu",
        "name": "John Doe 2",
        "userType": "voluntary",
        "id": 4
      },
      {
        "email": "johndoe3@mail.com",
        "password": "$2a$10$esaUGGcMZEMq29lXQoHqiOxJUh3Sfa8/6tv5ix.aCJh5YhGJ9aw2O",
        "name": "John Doe 3",
        "userType": "voluntary",
        "id": 5
      }
    ]
    ```

    -> Possíveis erros

    - "Missing authorization header" -> Token não informado;

    </br>

  - ### _Atualização profile voluntário_

    -> PATCH /users/:userId - Formato da requisição:

    ```json
    {
      "email": "voluntary@mail.com",
      "name": "Voluntary"
    }
    // Utilizar somente os campos que sofrerão alteração
    ```

    -> Status code 201 - Formato da resposta:

    ```json
    {
      "email": "voluntary@mail.com",
      "password": "$2a$10$s6qGUM5J7ovRU3n/C9f/JeskQRXlnBgPdFb9DftTPtLQTXoTBbhXC",
      "name": "Voluntary",
      "userType": "voluntary",
      "id": 1
    }
    ```

    -> Possíveis erros

    - "Missing authorization header" -> Token não informado;

    </br>

  - ### _Listagem de eventos em que o voluntário está inscrito_

        -> GET /events?voluntaries_like=[:userId]- Formato da requisição: sem corpo

        -> Status code 201 - Formato da resposta:

        ```json
        [
          {
            "title": "Agente de Biblioteca ",
            "description": "Buscamos pessoa para colaborar na organização, catalogação de uma biblioteca organizada e para mantê-la aberta. Vamos juntos!",
            "workType": "donation",
            "donationGoal": 0,
            "amountDonated": 0,
            "category": "education",
            "state": "São Paulo",
            "completed": false,
            "necessaryVoluntaries": 10,
            "voluntaries": [],
            "userId": "1",
            "id": 1
          },
          {
            "title": "Agente de Biblioteca 5",
            "description": "Buscamos pessoa para colaborar na organização, catalogação de uma biblioteca organizada e para mantê-la aberta. Vamos juntos!",
            "workType": "donation",
            "donationGoal": 0,
            "amountDonated": 0,
            "category": "education",
            "state": "São Paulo",
            "completed": false,
            "necessaryVoluntaries": 10,
            "voluntaries": [2, 4],
            "userId": "1",
            "id": 2
          },
          {
            "title": "Agente de Biblioteca 9",
            "description": "Buscamos pessoa para colaborar na organização, catalogação de uma biblioteca organizada e para mantê-la aberta. Vamos juntos!",
            "workType": "donation",
            "donationGoal": 0,
            "amountDonated": 0,
            "category": "education",
            "state": "São Paulo",
            "completed": false,
            "necessaryVoluntaries": 10,
            "voluntaries": [],
            "userId": "1",
            "id": 3
          }
        ]
        ```

        -> Possíveis erros

        - "Missing authorization header" -> Token não informado;

    <br/>

  - ### _Listagem de eventos em que o voluntário está inscrito filtrados por status_

    -> GET /events?voluntaries_like=[:userId]&completed_like=:status- Formato da requisição: sem corpo

    Obs: O valor do status sempre deve ser true ou false

    -> Status code 201 - Formato da resposta:

    ```json
    [
      {
        "title": "Agente de Biblioteca Concluido",
        "description": "Buscamos pessoa para colaborar na organização, catalogação de uma biblioteca organizada e para mantê-la aberta. Vamos juntos!",
        "work-type": "donation",
        "category": "education",
        "state": "São Paulo",
        "completed": false,
        "necessaryVoluntaries": 10,
        "voluntaries": [],
        "userId": "1",
        "id": 3,
        "workType": "volunteering",
        "donationGoal": 2000,
        "amountDonated": 0,
        "ongName": "ONG"
      }
    ]
    ```

    -> Possíveis erros

    - "Missing authorization header" -> Token não informado;

<br/>
<br/>

- ## _Instituições_

  - ### _Listagem de eventos criados pela instituição_

    -> GET /users/:userId/events - Formato da requisição: sem corpo

    -> Status code 201 - Formato da resposta:

    ```json
    [
      {
        "title": "Agente de Biblioteca Concluido",
        "description": "Buscamos pessoa para colaborar na organização, catalogação de uma biblioteca organizada e para mantê-la aberta. Vamos juntos!",
        "work-type": "volunteering",
        "donation-goal": 2000,
        "donation-value": 0,
        "category": "education",
        "state": "São Paulo",
        "completed": "false",
        "necessaryVoluntaries": 10,
        "voluntaries": [],
        "ong-name": "ONG",
        "userId": "1",
        "id": 1
      },
      {
        "title": "Agente de Biblioteca Concluido",
        "description": "Buscamos pessoa para colaborar na organização, catalogação de uma biblioteca organizada e para mantê-la aberta. Vamos juntos!",
        "work-type": "volunteering",
        "donation-goal": 2000,
        "donation-value": 0,
        "category": "education",
        "state": "São Paulo",
        "completed": "false",
        "necessaryVoluntaries": 10,
        "voluntaries": [],
        "ong-name": "ONG",
        "userId": "1",
        "id": 2
      }
    ]
    ```

    -> Possíveis erros

    - "Missing authorization header" -> Token não informado;

      </br>

  - ### _Listagem de eventos criados pela instituição filtrados por status_

    -> GET /users/:userId/events?completed_like=:status - Formato da requisição: sem corpo

    Obs: O valor do status sempre deve ser true ou false

    -> Status code 201 - Formato da resposta:

    ```json
    [
      {
        "title": "Agente de Biblioteca Concluido",
        "description": "Buscamos pessoa para colaborar na organização, catalogação de uma biblioteca organizada e para mantê-la aberta. Vamos juntos!",
        "work-type": "donation",
        "category": "education",
        "state": "São Paulo",
        "completed": false,
        "necessaryVoluntaries": 10,
        "voluntaries": [],
        "userId": "1",
        "id": 1,
        "workType": "volunteering",
        "donationGoal": 2000,
        "amountDonated": 0,
        "ongName": "ONG"
      },
      {
        "title": "Agente de Biblioteca Concluido",
        "description": "Buscamos pessoa para colaborar na organização, catalogação de uma biblioteca organizada e para mantê-la aberta. Vamos juntos!",
        "work-type": "donation",
        "category": "education",
        "state": "São Paulo",
        "completed": false,
        "necessaryVoluntaries": 10,
        "voluntaries": [],
        "userId": "1",
        "id": 2,
        "workType": "volunteering",
        "donationGoal": 2000,
        "amountDonated": 0,
        "ongName": "ONG"
      }
    ]
    ```

    -> Possíveis erros

    - "Missing authorization header" -> Token não informado;

      </br>

  - ### _Atualização profile instituição_

    -> PATCH /users/:userId - Formato da requisição:

    ```json
    {
      "email": "ong@mail.com",
      "name": "ONG"
    }
    // Utilizar somente os campos que sofrerão alteração
    ```

    -> Status code 201 - Formato da resposta:

    ```json
    {
      "email": "ong@mail.com",
      "password": "$2a$10$s6qGUM5J7ovRU3n/C9f/JeskQRXlnBgPdFb9DftTPtLQTXoTBbhXC",
      "name": "ONG",
      "userType": "ong",
      "id": 1
    }
    ```

    -> Possíveis erros

    - "Missing authorization header" -> Token não informado;

    </br>

  - ### _Listagem de todas as instituições_

    -> PATCH /users?userType_like=ong - Formato da requisição: sem corpo

    -> Status code 201 - Formato da resposta:

    ```json
    [
      {
        "email": "ong@mail.com",
        "password": "$2a$10$s2LDHIgDs9Gb9u/VxhmdBOBgM4UCHz6y/gvugbdRhO0NKzC85xBZ.",
        "name": "ONG",
        "userType": "ong",
        "id": 1
      },
      {
        "email": "ong3@mail.com",
        "password": "$2a$10$tFi.DVsXNqUdudCSb.IpV.SbnvV5T3ZGgiItMKNSnz/BML8QCPVMi",
        "name": "ONG3",
        "userType": "ong",
        "id": 3
      },
      {
        "email": "ong1@mail.com",
        "password": "$2a$10$lPyWyffJjJi2B.ceHBeF7e32f3ffcmKcZRcQEZPTC5LLqGBsg0axu",
        "name": "ONG1",
        "userType": "ong",
        "category": "education",
        "ceṕ": "12345-678",
        "id": 6
      }
    ]
    ```

    -> Possíveis erros

    - "Missing authorization header" -> Token não informado;

    </br>

    </br>

- ## _Eventos_

  - ### _Criação de eventos_

    -> POST /events - Formato da requisição:

    ```json
    {
      "title": "Agente de Biblioteca 9",
      "description": "Buscamos pessoa para colaborar na organização, catalogação de uma biblioteca organizada e para mantê-la aberta. Vamos juntos!",
      "workType": "donation",
      "donationGoal": 2000,
      "amountDonated": 0,
      "category": "education",
      "state": "São Paulo",
      "completed": false,
      "necessaryVoluntaries": 10,
      "voluntaries": [],
      "ongName": "ONG",
      "userId": "1"
    }
    ```

    -> Status code 201 - Formato da resposta:

    ```json
    {
      "title": "Agente de Biblioteca 9",
      "description": "Buscamos pessoa para colaborar na organização, catalogação de uma biblioteca organizada e para mantê-la aberta. Vamos juntos!",
      "workType": "donation",
      "donationGoal": 2000,
      "amountDonated": 0,
      "category": "education",
      "state": "São Paulo",
      "completed": false,
      "necessaryVoluntaries": 10,
      "voluntaries": [],
      "ongName": "ONG",
      "userId": "1"
      "id": 4
    }
    ```

    -> Possíveis erros

    - "Missing authorization header" -> Token não informado;
    - "Missing userType header" -> Tipo de usuário não informado.
    - "Unauthorized" -> Usuário do tipo "voluntary" tentando criar evento.

      </br>

  - ### _Atualização de evento_

    -> PATCH /events/:eventId - Formato da requisição:

    ```json
    {
      "title": "Agente de Biblioteca Concluido",
      "description": "Buscamos pessoa para colaborar na organização, catalogação de uma biblioteca organizada e para mantê-la aberta. Vamos juntos!",
      "workType": "volunteering",
      "donationGoal": 2000,
      "amountDonated": 0,
      "category": "education",
      "state": "São Paulo",
      "completed": true,
      "necessaryVoluntaries": 10,
      "voluntaries": [],
      "ongName": "ONG"
    }
    // Utilizar somente os campos que sofrerão alteração
    ```

    -> Status code 200 - Formato da resposta:

    ```json
    {
      "title": "Agente de Biblioteca Concluido",
      "description": "Buscamos pessoa para colaborar na organização, catalogação de uma biblioteca organizada e para mantê-la aberta. Vamos juntos!",
      "workType": "donation",
      "category": "education",
      "state": "São Paulo",
      "completed": true,
      "necessaryVoluntaries": 10,
      "voluntaries": [],
      "userId": "1",
      "id": 3,
      "workType": "volunteering",
      "donationGoal": 2000,
      "amountDonated": 0,
      "ongName": "ONG"
    }
    ```

    -> Possíveis erros

    - "Missing authorization header" -> Token não informado;

      </br>

  - ### _Inscrevendo-se em um evento_

    -> PATCH /events/:eventId - Formato da requisição:

    ```json
    {
      "voluntaries": [...oldUserIds , currentUserId]
    }
    ```

    -> Status code 200 - Formato da resposta:

    ```json
    {
      "title": "Agente de Biblioteca 9",
      "description": "Buscamos pessoa para colaborar na organização, catalogação de uma biblioteca organizada e para mantê-la aberta. Vamos juntos!",
      "workType": "donation",
      "category": "education",
      "state": "São Paulo",
      "completed": false,
      "necessaryVoluntaries": 10,
      "voluntaries": [],
      "userId": "1",
      "id": 1
    }
    ```

    -> Possíveis erros

    - "Missing authorization header" -> Token não informado;

      </br>

  - ### _Excluindo um evento_

    -> DELETE /events/:eventId - Formato da requisição: sem corpo

    -> Status code 200 - Formato da resposta: sem corpo

    -> Possíveis erros

    - "Missing authorization header" -> Token não informado;
