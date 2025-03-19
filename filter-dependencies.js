const pkg = require('./package.json');

// let newDependencies = {};
for (let d in pkg.dependencies) {
  if (d.startsWith('@app')) {
    delete pkg.dependencies[d];
  }
}

//pkg.dependencies = newDependencies;
console.log(JSON.stringify(pkg, null, 4));
