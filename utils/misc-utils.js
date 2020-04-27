const {isEmpty} = require("./string-utils");
const {config} = require("../config");

sleep = async(ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

exports.sleep = sleep;
exports.showProgressBarAnimation = async(label, millieSeconds) => {
    const iterations = 10;
    console.clear();
    console.log(label + '|' + ('-'.repeat(iterations)) + '| 0%')

    for (let i = 1; i <= iterations; i++) {
      await sleep(millieSeconds/iterations);
      console.clear();
      console.log(label + '|' + ('█'.repeat(i)) + ('-'.repeat(iterations-i)) + '|' + ((100*i)/iterations) + '%');
    }
}

/**
* Match a given textKey with an array of argument
*/
exports.loadConfig = (textKey, arguments) => {
  let keyIndex = arguments.indexOf(textKey);
  if (keyIndex > -1) {
     return arguments[keyIndex + 1];
  }

  return null;
}

/**
* Abstraction to enable/match action argument with a callback function
*/
exports.ActionMenu = function(args) {
  this.arguments = args;
  this.selectedArg = null;

  this.when = function(actionArg, callback) {
    const index = this.arguments.indexOf(actionArg);

    if (index > -1 && callback) {
        this.selectedArg = actionArg;
        callback(this,index).catch(e => {
          const {failOnError} = config;
          console.log(e.message);
          if (failOnError) {
            console.log("Scripts will be terminated");
            process.exit(1);
          }
        });
    }

    return this;
  }

  this.help = function(callback) {
    if (callback && isEmpty(this.selectedArg)) {
      callback(this);
    }
    return this;
  }
}
