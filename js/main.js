console.log("Really cool code will go here");

class Main {
  constructor(logTag, name) {
    this.logTag = logTag;
    this.name = name;
  }
  get name() {
    return name;
  }
  set name(other) {
    name = other;
  }
  yell(who) {
    console.log(`Yoooo, ${name} is angry at ${who}`);
  }
}

let m = new Main('fish', 'Finn');

console.log(m.name);
m.yell("Jake");
m.name = "Super Finn";
m.yell("Less than Jake");