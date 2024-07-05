const fs = require('fs');
const readline = require('readline');
const crypto = require('crypto');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function generateNitroCode() {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789';
  let code = '';

  for (let i = 0; i < 24; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }

  return code;
}

function generateNitroCodes(numCodes) {
  const filename = 'gens.txt';
  const stream = fs.createWriteStream(filename, { flags: 'a' });

  for (let i = 0; i < numCodes; i++) {
    const nitroCode = generateNitroCode();
    const fullUrl = `https://discord.com/billing/promotions/${nitroCode}`;
    stream.write(fullUrl + '\n');
  }

  stream.end();
  console.log(`${numCodes} nitro codes generated and saved to ${filename}`);
}

rl.question('How many nitro codes do you want to generate? (Enter a number, or "unlimited" for unlimited): ', (answer) => {
  rl.close();
  let numCodes = parseInt(answer);
  
  if (isNaN(numCodes) || numCodes <= 0) {
    console.log('Invalid input. Exiting...');
    return;
  }

  if (answer.toLowerCase() === 'unlimited') {
    numCodes = Infinity;
  }

  generateNitroCodes(numCodes);
});
