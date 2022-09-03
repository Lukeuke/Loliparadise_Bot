# Loliparadise Discord Bot 
### Basically what it does, it scrapes the website to look for whether product is available

## Invite loliparadise bot to your Discord server!
<a href="https://discord.com/oauth2/authorize?client_id=888527777974845541&permissions=8&scope=bot"> Invite me :pleading_emoji: </a>

<h3 id="how_to_use"> How to use: </h3>
<strong>Commands: </strong>

- Loops (with set interval) request to get latest status of stock  

```
$loop
```

- To stop the loop type:

```
$stop
```

- Status of current loop

```
$status
```

#### Installing and starting an application locally;

- Git clone the project,
- Install the dependencies by `npm i`,
- Make .env file and paste `TOKEN=<here_your_token_value>`,
- Start by `npm start`

#### What is `config.json`?

- Interval is value (in minutes) between the function calls. 
- Multiplier is just to convert minutes from interval to milliseconds.