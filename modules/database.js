const fs = require('node:fs');

exports.initNewServer = async function initNewServer (guild, client) {
    const directory = `./data/${guild.id}`;
    try {
        if (!fs.existsSync(directory)) {
          fs.mkdirSync(directory);
        }
    } catch (err) {
        console.error(err);
    }

    await initFiles(guild);
}

exports.getObjectFromFile = async function getObjectFromFile(filePath) {
    return new Promise(async (resolve, reject) => {
        await fs.readFile(filePath, 'utf8', async (err, data) => {
            if (err){
                reject(err);
            } else {
                if (data == '') {
                    resolve(null);
                    return;
                }
                object = JSON.parse(data, module.exports.reviver);
                resolve(object);
            }
        });
    });
}

exports.writeObjectToFile = async function writeObjectToFile(filePath, object) {
    return new Promise(async (resolve, reject) => {
        let objectString = JSON.stringify(object, module.exports.replacer);
        await fs.writeFile(filePath, objectString, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

exports.replacer = function replacer(key, value) {
    if(value instanceof Map) {
      return {
        dataType: 'Map',
        value: Array.from(value.entries()), // or with spread: value: [...value]
      };
    } else {
      return value;
    }
}

exports.reviver = function reviver(key, value) {
    if(typeof value === 'object' && value !== null) {
        if (value.dataType === 'Map') {
        return new Map(value.value);
        }
    }
    return value;
}

async function initFiles(guild) {
    let settings = {};
    await module.setSettings(guild, settings);
}

exports.setSettings = async function setSettings(guild, settings) {
    await module.exports.writeObjectToFile(`./data/${guild.id}/settings.json`, settings);
}