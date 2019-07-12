var context = require.context('./target/test', true, /\.karma\.js$/);
context.keys().forEach(context);