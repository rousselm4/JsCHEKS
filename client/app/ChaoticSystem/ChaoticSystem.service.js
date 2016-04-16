'use strict';
(function() {
  class ChaoticSystemService {

    constructor() {
      var impactRange = new Range(0, 256);
      var keyPartRange = new Range(-128, 127);
      var delayRange = new Range(0, 4);
      this.system = new ChaoticSystem(128,"sysId", impactRange, keyPartRange, delayRange, new PRNG());
    }

    evolve() {
      this.system.evolve();
    }

    getKey(){
      return this.system.getKey(128);
    }

    getKeyAsBytes(){

    }

  }
  angular.module('kekchoseIoApp')
    .service('ChaoticSystem', ChaoticSystemService);


  class ChaoticSystem{

    constructor(keyLength, systemId, impactRange, keyPartRange, delayRange, prng){
      this.agents = [];
      this.keyLength = keyLength;
      this.systemId = systemId;
      this.impactRange = impactRange;
      this.impactRangeMax = impactRange.getMax();
      this.keyPartRange = keyPartRange;
      this.delayRange = delayRange;
      this.generateSystem(this.keyLength, prng);
    }
    getAgents() {
        return this.agents;
    }

    evolve() {
        for(var agentId in this.agents){ //Verify if it's alway the same order. For sync.
            this.agents[agentId].sendImpacts(this);
        }

        for(var agentId in this.agents){ //Verify if it's alway the same order. For sync.
            this.agents[agentId].evolve(this.keyPartRange);
        }

        this.buildKey();

    }

    getKey(requiredBitLength){
        if (requiredBitLength % 8 === 0) {
            return this.lastGeneratedKey;
        }
        console.error("Invalid key length. Must be a multiple of 8.");
    }

    generateSystem(keyLength, prng){
        this.keyLength = keyLength;

        if ((this.keyLength % 8) != 0) {
            console.error("Invalid key length. Must be a multiple of 128.");
            return;
        }

        var numberOfAgents = this.keyLength / 8;
        for (var i = 0; i < numberOfAgents; i++) {
            this.agents[i] = new Agent(i, this.impactRange, this.keyPartRange, this.delayRange, numberOfAgents, numberOfAgents - 1, prng);
        }
        this.buildKey();
    }

    buildKey() {
        this.lastGeneratedKey = [];
        for (var i = 0; i < (this.keyLength / 8); i++) {
            this.lastGeneratedKey[i] = this.agents[i].getKeyPart();
        }
    }

    getAgentsCount() {
        return this.agents.length();
    }
  }

class Agent{
    getAgentId() {
        return this.agentId;
    }

    getKeyPart() {
        return this.keyPart;
    }

    getPendingImpacts() {
        return this.pendingImpacts;
    }

    getRuleSets() {
        return this.ruleSets;
    }

    constructor(agentId, impactRange, keyPartRange, delayRange, ruleCount, agentCount, prng) {
        this.agentId = agentId;
        this.keyPart = (new Utils()).GetRandomInt(keyPartRange, prng);
        this.ruleSets = [];
        for (var i = keyPartRange.getMin(); i < keyPartRange.getMax() + 1; i++) {
            this.ruleSets[i] = new RuleSet(i, impactRange, delayRange, ruleCount, agentCount, prng);
        }
        this.pendingImpacts = [];
    }

    getCurrentRuleSet() {
        return this.ruleSets[this.keyPart];
    }

    registerImpact(impact, delay) {
        if (!this.pendingImpacts[delay]) {
            this.pendingImpacts[delay] = impact;
        }
        else{
            this.pendingImpacts[delay] = this.pendingImpacts[delay] + impact;
        }
    }

    sendImpacts(system) {
      var rules = this.getCurrentRuleSet().getRules();
      for(var ruleId in rules){
        var rule = rules[ruleId];
        system.getAgents()[rule.getDestination()].registerImpact(rule.getImpact(), rule.getDelay());
      }
      this.keyPart += this.getCurrentRuleSet().getSelfImpact();
    }

    evolve(keyPartRange) {
        if (this.pendingImpacts[0]) {
            this.keyPart += this.pendingImpacts[0];
            this.pendingImpacts[0] = null;
        }
        var tempImpacts = [];


        for(var impactIndex in this.pendingImpacts){
          if(this.pendingImpacts[impactIndex]){
            tempImpacts[impactIndex-1] = this.pendingImpacts[impactIndex];
          }
        }
        this.pendingImpacts = tempImpacts;
        this.keyPart = (new Utils()).adjustNumber(keyPartRange, this.keyPart);
    }
}
class Range{

   constructor(min, max) {
      this.min = min;
      this.max = max;
    }

    getMin() {
      return this.min;
    }

    getMax() {
      return this.max;
    }
}
class Rule{

    constructor(destination, impactRange, delayRange, prng) {
        this.destination = destination;
        this.impact = (new Utils()).GetRandomIntAvoidingZero(impactRange, prng);
        this.delay = (new Utils()).GetRandomInt(delayRange, prng);
    }

    getDestination() {
        return this.destination;
    }

    getImpact() {
        return this.impact;
    }

    getDelay() {
        return this.delay;
    }
}
class Utils {

    GetRandomInt(range, prng) {
        if(range instanceof Range)return this.GetRandInt(range, prng);
        return prng.nextInt(range + 1);
    }

    GetRandomIntAvoidingZero(range, prng) {
        var result = this.GetRandInt(range, prng);

        while(result == 0) {
            result = this.GetRandInt(range, prng);
        }
        return result;
    }

    GetRandInt(range, prng) {
        return prng.nextInt((range.getMax() - range.getMin()) + 1) + range.getMin();
    }

    QuarterShot(prng) {
        return prng.nextInt(2) == 0;
    }

    adjustNumber(range, number) {
        var rangeLength = range.getMax() - range.getMin() + 1;
        var min = range.getMin(), max = range.getMax();
        if (number > max) {
            number = min + (number + Math.abs(min) - (rangeLength * Math.floor((number + Math.abs(min)) / rangeLength)));
        }

        if (number < min) {
            number =  max + (number - max  - (rangeLength * ((number - max) / rangeLength)));
        }
        return number;
    }
}
class PRNG{
  nextInt(max){
    return Math.floor(Math.random() * max);
  }
}
class RuleSet{

  constructor(level, impactRange, delayRange, ruleCount, agentCount, prng) {
    this.rules = [];
    this.level = level;
    this.selfImpact = (new Utils()).GetRandomIntAvoidingZero(impactRange, prng);

    for (var x = 0; x < ruleCount; x++) {
        this.rules.push(new Rule((new Utils()).GetRandomInt(agentCount, prng), impactRange, delayRange, prng));
    }
  }

  getLevel() {
        return this.level;
  }

  getSelfImpact() {
      return this.selfImpact;
  }

  getRules() {
      return this.rules;
  }
}

})();
