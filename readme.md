# factory-models CLI

A CLI for factory-models.

# How to install

Do this: ```yarn / npm i```

after install the packages do: ```yarn link or npm link```

# Usage

In your main dir make a file called ```.factory.js``` and use the schema bellow to build it.

module.exports = {
    model: path to model,
    controller: path to controller,
    route: path to route.js
}
    
to run use: ```factory-models g (name) ``` or ```factory-models generate:models (name)```
