/* password_validation.js.js */
//source of regex:
//https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
var passReg = /^.{8,}$/; // 8 characters
var passRegUpp = /^(?=.*?[A-Z]).{1,}$/; //uppercase letter
var passRegSpecial = /^(?=.*?[#?!@$%^&*-]).{1,}$/; //special character
var passRegNum = /^(?=.*?[0-9]).{1,}$/; //number

/**
 * this function shows password strenght
 **/
function passStrenghtHint() {
    // show hint message  if password doesn't have:
    $(pwd1Hint21).css("display", "block"); //uppercase
    $(pwd1Hint31).css("display", "block"); //special character
    $(pwd1Hint41).css("display", "block"); //number
    //show password strenght
    $(pwd1Hint1).css("display", "inline");
}

/**
 * this function checks if password has 8 characters
 **/
function isLong() {
    //checks if password has 8 characters
    if (!$(password1).val().match(passReg)) {
        //display warning if doesn't match with regex
        $(pwd1Hint).css("display", "block");
        $(pwd1Hint0).css("display", "none");
    } else {
        $(pwd1Hint).css("display", "none");
        //add one hyphen if password has 8 character
        //to the password Strenght hint message
        $(pwd1Hint0).css("display", "inline");
    }
}

/**
 * this function checks if password has one uppercase letter
 **/
function isUper() {
    if ($(password1).val().match(passRegUpp)) {
        //add one hyphen if password has one uppercase
        $(pwd1Hint2).css("display", "inline");
        $(pwd1Hint21).css("display", "none");
    } else {
        $(pwd1Hint2).css("display", "none");
        $(pwd1Hint21).css("display", "block");
    }
}

/**
 * this function checks if password has one special character
 **/
function isSpecialCh() {
    if ($(password1).val().match(passRegSpecial)) {
        //add one hyphen if password has one special character
        $(pwd1Hint3).css("display", "inline");
        $(pwd1Hint31).css("display", "none");
    } else {
        $(pwd1Hint3).css("display", "none");
        $(pwd1Hint31).css("display", "block");
    }
}

/**
 * this function checks if password has one number
 **/
function isNum() {
    if ($(password1).val().match(passRegNum)) {
        //add one hyphen if password has one number
        $(pwd1Hint4).css("display", "inline");
        $(pwd1Hint41).css("display", "none");
    } else {
        $(pwd1Hint4).css("display", "none");
        $(pwd1Hint41).css("display", "block");
    }
}
