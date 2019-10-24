const fs = require('fs');

const targetPath = `./src/environments/environment.js`;


// Show variables during construction
console.log(
  `Using environment variable REPOS with value ${
    process.env.REPOS
  }.`
);
console.log(
  `Using environment variable TIME_LAP with value ${
    process.env.TIME_LAP
  }`
);

const envConfigFile = `
export const environment = {
  REPOS: ${JSON.stringify(process.env.REPOS.split(","))},
  TIME_LAP: ${process.env.TIME_LAP ? process.env.TIME_LAP : 10000},
};
`;

// Write environment file
fs.writeFile(targetPath, envConfigFile, function(err) {
  if (err) {
    console.log(err);
  }

  console.log(`Output generated at ${targetPath}`);
});
