"use strict";

var LevelManager = (function () {
    
    function LevelManager() {
        // arrays of LevelRecipes, StepDescriptions
        this.LevelRecipies = [];
        this.StepDescriptions = [];
        this.Choices = [];
    }

    // Add LevelRecipe (characterClass, level, hitPoint, steps)
    LevelManager.prototype.addLevelRecipe = function (characterClass, level, hitPoint) {
        var contains = false;
        for (var i = 0, len = LevelRecipes.length; i < len; i++) {
            if(LevelRecipes[i].level == level && LevelRecipes[i].characterClass == characterClass){
                contains = true;
                console.log("this level recipe already exists.")
            }
        }
        if (!contains) {
            var steps = [];
            var newLevelRecipe = new LevelRecipe(characterClass, level, hitPoint, steps);
            this.LevelRecipes.push(newLevelRecipe);
        }
    };

    // Add StepDescriptions (title, explaination, choiceNames)
    LevelManager.prototype.addStepDescription = function (title, explaination, choiceNames) {
        var contains = false;
        for (var i = 0, len = LevelRecipes.length; i < len; i++) {
            if(StepDescriptions[i].title == title){
                contains = true;
                console.log("this step description already exists.")
            }
        }
        if (!contains) {
            var characterClass = "";
            var level = "";
            var newStepDescription = new StepDescription(characterClass, level, title, explaination, choiceNames);
            this.StepDescriptions.push(newStepDescription);
            return newStepDescription.getTitle();
        }
    };

    // Add StepChoices (title, explaination)
    LevelManager.prototype.addStepChoices = function (title, explaination) {
        var contains = false;
        for (var i = 0, len = LevelRecipes.length; i < len; i++) {
            if(Choices[i].title == title){
                contains = true;
                console.log("this step description already exists.")
            }
        }
        if (!contains) {
            var newStepChoice = new StepChoice(title, explaination);
            this.Choices.push(newStepChoice);
            return newStepChoice.getTitle();
        }
    };

    // Add Step to Recipe (memberName, protestName)
    LevelManager.prototype.addStepToRecipe = function (stepName, characterClass, level) {
        var recipe = searchName(this.LevelRecipies, characterClass, level);
        var step = searchName(this.StepDescriptions, stepName);
        recipes.pushSteps(step);
    };

    // Retrieves names of all available Character Classes
    LevelManager.prototype.getClasses = function () {
        return classArray(this.LevelRecipies);
    };

    // Retrieves specific Level Recipe
    LevelManager.prototype.getRecipe = function (characterClass, level) {
        return findRecipe(this.LevelRecipies, characterClass, level);
    };

    // Retrieves specific Step Description
    LevelManager.prototype.getStepDescription = function (title) {
        return findByTitle(this.StepDescriptions, title);
    };

    // Retrieves specific Choice
    LevelManager.prototype.getChoice = function (title) {
        return findByTitle(this.Choices, title);
    };

    return LevelManager;
}());

exports.LevelManager = LevelManager;



// Finds Level Recipe
function findRecipe(collection, characterClass, level) {
    var find;
    collection.forEach(function (element) {
        var cc = element.getCharacterClass();
        var l = element.getLevel();
        if (characterClass === cc && level === l) {
            find = element;
        }
    });
    return find;
}

// Finds element in given collection with the given title
function findByTitle(collection, title) {
    var find;
    collection.forEach(function (element) {
        var elementTitle = element.getTitle();
        if (elementTitle === title) {
            find = element;
        }
    });
    return find;
}

// Gives character classes available
function classArray(collection) {
    var classes = [];
    // Adds all unique character classes to array
    collection.forEach(function (element) {
        var name = element.getClass();
        var contains = false;
        // is this class unique?
        classes.forEach(function (saved){
            if (saved === name){
                contains = true;
            }
        })
        // adds unique
        if (!contains){
            names.push(name);
        }
    });
    return classes;
}


// new LevelRecipe(characterClass, level, hitPoint, steps);
var LevelRecipe = (function () {
    function LevelRecipe(characterClass, level, hitPoint, steps) {
        this.characterClass = characterClass;
        this.level = level;
        this.hitPoint = hitPoint;
        this.steps = steps;
    }
    LevelRecipe.prototype.getCharacterClass = function () {
        // var ourCC = this.characterClass;
        // return ourCC;
        return this.characterClass;
    };
    LevelRecipe.prototype.getLevel = function () {
        // var ourLevel = this.level;
        // return ourLevel;
        return this.level;
    };
    LevelRecipe.prototype.pushSteps = function (newStep) {
        this.steps.push(newStep);
    }
    return LevelRecipe;
}());

// new StepDescription(characterClass, level, title, explaination, choiceNames);
var StepDescription = (function () {
    function StepDescription(characterClass, level, title, explaination, choiceNames) {
        this.characterClass = characterClass;
        this.level = level;
        this.title = title;
        this.explaination = explaination;
        this.choiceNames = choiceNames;
    }
    Protest.prototype.getTitle = function () {
        return this.title
    };
    return StepDescription;
}());

// new StepChoice(title, explaination);
var StepChoice = (function () {
    function StepChoice(title, explaination) {
        this.title = title;
        this.explaination = explaination;
    }
    StepChoice.prototype.getTitle = function () {
        return this.title;
    };
    return StepChoice;
}());