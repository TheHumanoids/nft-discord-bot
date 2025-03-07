const fetch = require('node-fetch');
const { openseaAssetUrl } = require('../config.json');

const Discord = require('discord.js');

module.exports = {
	name: process.env.DISCORD_TOKEN_COMMAND || "humanoid",
	execute(message) {
//     if (!args.length) {
//       return message.channel.send(`You didn't provide a token id, ${message.author}!`);
	
//     }

//     if (isNaN(parseInt(args[0]))) {
//       return message.channel.send(`Token id must be a number!`);
//     }
		
    var randomToken = Math.round(Math.random() * (10000 - 1) + 1);

    let url = `${openseaAssetUrl}/${process.env.CONTRACT_ADDRESS}/${randomToken}`;
    let settings = { 
      method: "GET",
      headers: {
        "X-API-KEY": process.env.OPEN_SEA_API_KEY
      }
    };
    
    fetch(url, settings)
        .then(res => {
          if (res.status == 404 || res.status == 400)
          {
            throw new Error("Token id doesn't exist.");
          }
          if (res.status != 200)
          {
            throw new Error(`Couldn't retrieve metadata: ${res.statusText}`);
          }
          return res.json();
        })
        .then((metadata) => {
            const embedMsg = new Discord.MessageEmbed()
              .setColor('#0099ff')
              .setImage(metadata.image_url)
	      .setTitle(metadata.name)
              .setURL(metadata.permalink);
            message.channel.send(embedMsg);
        })
        .catch(error => message.channel.send(error.message));
	},
};
