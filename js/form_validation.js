/* form_validation.js */
/**
 * this function validates form input
 *
 * it satisfies next requirements:
 * - Form validation
 * - Capturing and handling events
 * - DOM element creation, deletion or modification
 * - Creating and handling a data structure
 *
 * @author Svitlana Lesiv
 * @version Last_modified 13_Dec_2017
 **/
$(document).ready(function() {
  "use strict";

  /*Form validation*
    *Capturing and handling events*
    *DOM element creation, deletion or modification*
    *****************************************/

  /**
   * this function writes to <span> element value of input
   * field for name; and show/hide hint message
   **/
  $(name1).keyup(function() {
    //if any value in input
    if ($(this).val()) {
      // write that value to <span> and hide hint message
      $(nameAva).html($(this).val());
      $(nameHint).css("display", "none");
    } else {
      //if not write to <span> - "Your name here" and show hint
      $(nameAva).html("Your name here");
      $(nameHint).css("display", "block");
    }
  });


  //source of regex:
  //https://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address
  var emailReg = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

  /**
   * this function validates email address and show/hide hint message
   **/
  $(email1).keyup(function() {
    //if value of email input field doesn't match with regex
    if (!$(this).val().match(emailReg)) {
      //show warning message
      $(email1Hint).css("display", "block");
    } else {
      $(email1Hint).css("display", "none");
    }
  });

  /**
   * this function validates password input field,
   * and shows hint how strong password by calling
   * passStrenghtHint(),passLength(),isUper(),isSpecialCh(),isNum() functions
   *
   * they are stored in password_validation.js file
   **/
  $(password1).keyup(function() {
    // show hint message if password doesn't have:
    //uppercase,special character, number and also show password strenght
    passStrenghtHint();
    //add one hyphen to password strenght if password has 8 character
    isLong();
    //add one hyphen to password strenght if password has one uppercase
    isUper();
    //add one hyphen to password strenght if password has one special character
    isSpecialCh();
    //add one hyphen to password strenght if password has one number
    isNum();
  });

  /**
   * this function checks if password value
   * from first field matches with second field and
   * shows warning if they don't match
   **/
  $(password2).keyup(function() {
    if ($(this).val().trim() != $(password1).val().trim()) {
      $(pwd2Hint).css("display", "block");
    } else {
      $(pwd2Hint).css("display", "none");
    }
  });

  /*Creating and handling a data structure*
    *****************************************/
  //images source: http://www.freepik.com
  // create an object for avatars
  var avatarsList = {
    "avatars": [{
        "avatarName": "boy",
        "avatarPic": "./img/boy.png"
      },
      {
        "avatarName": "girl",
        "avatarPic": "./img/girl.png"
      },
      {
        "avatarName": "cat",
        "avatarPic": "./img/cat.png"
      },
      {
        "avatarName": "chicken",
        "avatarPic": "./img/chicken.png"
      },
      {
        "avatarName": "cow",
        "avatarPic": "./img/cow.png"
      },
      {
        "avatarName": "deer",
        "avatarPic": "./img/deer.png"
      },
      {
        "avatarName": "fox",
        "avatarPic": "./img/fox.png"
      },
      {
        "avatarName": "monkey",
        "avatarPic": "./img/monkey.png"
      },
      {
        "avatarName": "panda",
        "avatarPic": "./img/panda.png"
      },
      {
        "avatarName": "pig",
        "avatarPic": "./img/pig.png"
      }
    ]
  };

  /**
   * this function creates <option> for avatarName
   * and appends to <select>
   * */
  function populateSelectElement(avatarsList) {
    for (var i = 0; i < avatarsList.avatars.length; i++) {
      for (var key in avatarsList.avatars[i]) {
        // look for 'avatarName' as a key
        if (key == "avatarName") {
          var s = document.createElement("option");
          var t = document.createTextNode(avatarsList.avatars[i][key]);
          // add text node to <option>
          $(s).append(t);
          // set value="" on the <option>
          $(s).attr("value", avatarsList.avatars[i][key]);
          // add the new <option> to the <select>
          $(avatarSel).append(s);
        }
      }
    }
  }

  populateSelectElement(avatarsList);

  /**
   * this function change images in <aside>, depending
   * what is selected in drop-down list
   **/
  $(avatarSel).change(function() {
    //if something selected in <select>
    if ($(avatarSel).val()) {
      //img source variable
      var imgSrc = "./img/" + $(avatarSel).val() + ".png"
      //change img source in <img>
      $(pic).attr("src", imgSrc);
      //change color of <option> if selected
      $("select").css("color", "white");
      $("select").css("text-decoration", "none");
    } else {
      //if nothing selected, keep default image
      $(pic).attr("src", "img/girl.png");
      $("select").css("color", "#999");
    }
  });

  /**
   * this function prevents from submitting if
   * there are no value in specified input field or value is not valid
   **/
  $(submitBtn).click(function(e) {
    if (!$(name).val()) {
      // to prevent submission to the sever if conditions haven't met
      e.preventDefault();
      // write warning message
      alert("Please write your name");
      //check if email input is not empty and if it's valid
    } else if (!$(email).val() || !$(email).val().match(emailReg)) {
      e.preventDefault();
      alert("Please write your email");
      //check if password field not empty and if has at least 8 characters
    } else if (!$(password1).val() || !$(password1).val().match(passReg)) {
      e.preventDefault();
      alert("Your password should be at least 8 characters long");
      //check password match field: if not empty and if valid
    } else if (!$(password2).val() || $(password2).val().trim() != $(password1).val().trim()) {
      e.preventDefault();
      alert("Retype your password correctly");
    } else {
      //if everything is good - submit form
      $(regForm).submit();
    }
  });

});
