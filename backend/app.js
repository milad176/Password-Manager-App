const express = require("express");
const hasTypes = require("./has-types");
const sqlite3 = require("sqlite3");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const ACCESS_TOKEN_SECRET = "hjdndkabnwrfdfbrskl";
const ID_TOKEN_SECRET = "lkjhdfukugbhjshvgjhe";

// The application.
const app = express();

// Add middleware to parse the boyd in incoming HTTP requests.
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

// creating database
const db = new sqlite3.Database("my-database.db");

// Enable foreign key constraints.
db.run("PRAGMA foreign_keys = ON");

// creating table in the database
const accountQuery = `CREATE TABLE IF NOT EXISTS accounts(
                      id INTEGER PRIMARY KEY,
                      username TEXT,
                      password TEXT, 
                      CONSTRAINT uniqueUsername UNIQUE(username));`;
db.run(accountQuery, function (error) {
  if (error) {
    console.log(error.message);
  } else {
    console.log("account Table is created");
  }
});

const appQuery = `CREATE TABLE IF NOT EXISTS appsPasswords(
                   id INTEGER PRIMARY KEY,
                   accountId INTEGER,
                   applicationName TEXT,
                   applicationPassword TEXT, 
                   FOREIGN KEY(accountId) REFERENCES accounts(id)
                   ON DELETE CASCADE);`;
db.run(appQuery, function (error) {
  if (error) {
    console.log(error.message);
  } else {
    console.log("app Table is created");
  }
});

app.get("/", function (request, response) {
  response.send("Hello, World");
});

// CORS
app.use(function (request, response, next) {
  // Allow client-side JS from the following websites to send requests to us:
  // (not optimal, for better security, change * to the URI of your frontend)
  response.setHeader("Access-Control-Allow-Origin", "*");

  // Allow client-side JS to send requests with the following methods:
  response.setHeader("Access-Control-Allow-Methods", "*");

  // Allow client-side JS to send requests with the following headers:
  // (needed for the Authorization and Content-Type headers)
  response.setHeader("Access-Control-Allow-Headers", "*");

  // Allow client-side JS to read the following headers in the response:
  // (in addition to Cache-Control, Content-Language, Content-Type
  // Expires, Last-Modified, Pragma).
  // (needed for the Location header)
  response.setHeader("Access-Control-Expose-Headers", "*");

  next();
});

// Try to extract access token in the request.
app.use(function (request, response, next) {
  try {
    const authorizationHeader = request.get("Authorization");
    const accessToken = authorizationHeader.substr("Bearer ".length);

    jwt.verify(accessToken, ACCESS_TOKEN_SECRET, function (error, payload) {
      if (error) {
        console.log(`Retrieved invalid access token "${accessToken}".`);
      } else {
        request.accountId = payload.accountId;
      }
      next();
    });
  } catch (error) {
    next();
  }
});

//Create new account
app.post("/accounts", function (request, response) {
  const account = request.body;

  const accountTypes = {
    username: String,
    password: String,
  };

  if (!hasTypes(account, accountTypes)) {
    response.status(422).end();
    return;
  }

  if (account.username === "" || account.password === "") {
    response.status(400).json({
      error: "unsupported Value",
    });
    return;
  }

  const query = "INSERT INTO accounts (username, password) VALUES (?, ?)";
  const values = [account.username, account.password];
  db.run(query, values, function (error) {
    if (error) {
      response.status(400).json({
        error: "this username already exist. please choose another user name",
      });
      return;
    } else {
      const id = this.lastID;
      response.setHeader("Location", "/accounts/" + id);
      response.status(201).end();
      console.log("New account is created");
    }
  });
});

//Create new AppPassword
app.post("/applications", function (request, response) {
  const application = request.body;
  if (
    application.applicationName === "" ||
    application.applicationPassword === ""
  ) {
    response.status(400).json({
      error: "unsupported Value",
    });
    return;
  }

  const query =
    "INSERT INTO appsPasswords (accountId, applicationName, applicationPassword) VALUES (?, ?, ?)";
  const values = [
    application.accountId,
    application.applicationName,
    application.applicationPassword,
  ];
  db.run(query, values, function (error) {
    if (error) {
      if (true) {
        response.status(400).json({
          error: "accountNotFound",
        });
        console.log(error);
        return;
      } else {
        response.status(500).end();
        console.log(error);
        return;
      }
    } else {
      const id = this.lastID;
      response.header("Location", "/appsPasswords/" + id);
      response.status(201).end();
      console.log("New applicationInfo is created");
    }
  });
});

//Update an account
app.put("/accounts/:id", function (request, response) {
  const id = request.params.id;
  const account = request.body;
  if (
    account.username === "" ||
    account.password === ""
  ) {
    response.status(400).json({
      error: "unsupported Value",
    });
    return;
  }
  const query =
    "UPDATE accounts SET (username, password) = (?, ?) WHERE id = ?";
  const values = [account.username, account.password, id];
  db.run(query, values, function (error) {
    if (error) {
      response.status(500).end();
    } else {
      const numberOfUpdatedRows = this.changes == 1;
      response.status(204).json(numberOfUpdatedRows);
      console.log(" account is Updated");
    }
  });
});

//Update a password
app.put("/applications/:id", function (request, response) {
  const id = request.params.id;
  const application = request.body;
  if (
    application.applicationName === "" ||
    application.applicationPassword === ""
  ) {
    response.status(400).json({
      error: "unsupported Value",
    });
    return;
  }
  const query =
    "UPDATE appsPasswords SET (applicationName, applicationPassword) = (?, ?) WHERE id = ?";
  const values = [
    application.applicationName,
    application.applicationPassword,
    id,
  ];
  db.run(query, values, function (error) {
    if (error) {
      response.status(500).end();
    } else {
      const activityExisted = this.changes == 1;
      response.status(204).json(activityExisted);
      console.log(" password is Updated");
    }
  });
});

//Delete an account
app.delete("/accounts/:id", function (request, response) {
  const id = request.params.id;
  const query = "DELETE FROM accounts WHERE id = ?";
  const values = [id];
  db.run(query, values, function (error) {
    if (error) {
      response.status(500).end();
    } else {
      response.status(200).end();
      console.log("Account is deleted");
    }
  });
});

//Delete a password
app.delete("/applications/:id", function (request, response) {
  const id = request.params.id;
  const query = "DELETE FROM appsPasswords WHERE id = ?";
  const values = [id];
  db.run(query, values, function (error) {
    if (error) {
      response.status(500).end();
    } else {
      response.status(200).end();
      console.log("app pass is deleted");
    }
  });
});

// Fetching all accounts
app.get("/accounts", function (request, response) {
  // TODO: You should probably not fetch the password...
  const query = "SELECT * FROM accounts ORDER BY username";
  db.all(query, function (error, accounts) {
    if (error) {
      // If something went wrong, send back status code 500.
      response.status(500).end();
    } else {
      // Otherwise, send back all accounts in JSON format.
      response.status(200).json(accounts);
    }
  });
});

// Fetching a single account
app.get("/accounts/:id", function (request, response) {
  const id = request.params.id;
  const query = "SELECT * FROM accounts WHERE id = ?";
  const values = [id];
  db.get(query, values, function (error, account) {
    if (error) {
      // If something went wrong, send back status code 500.
      response.status(500).end();
    } else if (!account) {
      // If no account with that id existed.
      response.status(404).end();
    } else {
      // Otherwise, send back the account in JSON format.
      response.status(200).json(account);
    }
  });
});

// Fetching all users app
app.get("/applications/:id", function (request, response) {
  const accountId = request.params.id;
  const query = `
		SELECT * FROM appsPasswords WHERE accountId = ? ORDER BY id
	`;
  const values = [accountId];

  db.all(query, values, function (error, apps) {
    if (error) {
      response.status(500).end();
    } else {
      response.status(200).json(apps);
    }
  });
});

// Requests for token resources.
app.post("/tokens", function (request, response) {
  const grantInfo = request.body;
  const grantInfoTypes = {
    grant_type: String,
    username: String,
    password: String,
  };

  if (!hasTypes(grantInfo, grantInfoTypes)) {
    response.status(400).json({
      error: "invalid_request",
    });
    return;
  }

  if (grantInfo.grant_type != "password") {
    response.status(400).json({
      error: "unsupported_grant_type",
    });
    return;
  }

  if (grantInfo.username === "" || grantInfo.password === "") {
    response.status(400).json({
      error: "unsupported Value",
    });
    return;
  }

  const query = "SELECT * FROM accounts WHERE username = ?";
  const values = [grantInfo.username];

  db.get(query, values, function (errors, account) {
    if (errors) {
      response.status(500).end();
      return;
    } else if (!account) {
      response.status(404).json({
        errors: "there is no account with this user name",
      });
      return;
    } else if (account.password != grantInfo.password) {
      response.status(400).json({
        error: "invalid_grant",
      });
    } else {
      // Generate and send back access token + id token.
      const accessToken = jwt.sign(
        {
          accountId: account.id,
        },
        ACCESS_TOKEN_SECRET
      );

      const idToken = jwt.sign(
        {
          sub: account.id,
          preferred_username: account.username,
        },
        ID_TOKEN_SECRET
      );

      response.status(200).json({
        token_type: "Bearer",
        access_token: accessToken,
        id_token: idToken,
      });
    }
  });
});

app.listen(3000);
