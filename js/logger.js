class Logger {
  constructor(tagname) {
    this.tagname = tagname;
  }
  log(msg) {
    console.log(`[${this.tagname}]: ${msg}`);
  }
  warn(msg) {
    console.warn(`[${this.tagname}]: ${msg}`);
  }
  info(msg) {
    console.info(`[${this.tagname}]: ${msg}`);
  }
  debug(msg) {
    console.debug(`[${this.tagname}]: ${msg}`);
  }
}

module.exports = Logger;