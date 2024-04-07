function sumOfDigits(num) {
  let sum = 0;
  while (num > 0) {
    sum += num % 10;
    num = Math.floor(num / 10);
  }
  return sum;
}
function containsSpecialCharacters(str) {
  // Regular expression to match any character that is not alphanumeric or whitespace
  const regex = /[^a-zA-Z0-9\s@.]/;
  // Test the string against the regular expression
  return regex.test(str);
}
function numChar(str, char) {
  var cnt = 0;
  for (var i = 0; i < str.length; i++) {
    if (str[i] == char) {
      cnt++;
    }
  }
  return cnt;
}
function isPrime(number) {
  // Check if the number is less than 2
  if (number < 2) {
    return false;
  }

  // Check for divisibility by numbers from 2 to the square root of the number
  for (let i = 2; i <= Math.sqrt(number); i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
}
function everyOtherDigitEven(number) {
  // Convert the number to a string to easily access individual digits
  const numString = number.toString();

  // Iterate through the digits starting from the second digit (index 1)
  for (let i = 1; i < numString.length; i += 2) {
    // Convert the current digit back to a number
    const digit = parseInt(numString[i], 10);

    // Check if the digit is odd
    if (digit % 2 !== 0) {
      return false;
    }
  }

  // If no odd digits are found, return true
  return true;
}
$(document).ready(function() {
  //display DOB dropdown options
  for (var i = 1; i <= 12; i++) {
    $('#birthMonth').append($('<option>', {
      value: i,
      text: i
    }));
  }
  for (var i = 1; i <= 31; i++) {
    $('#birthDate').append($('<option>', {
      value: i,
      text: i
    }));
  }
  for (var i = 2024; i >= 1900; i--) {
    $('#birthYear').append($('<option>', {
      value: i,
      text: i
    }));
  }
  var races = ["Asian", "African American", "Caucasian", "Hispanic", "Middle Eastern"];
  races.forEach(race => {
    $('#race').append($('<option>', {
      value: race,
      text: race
    }));
  });

  $.get("majors.txt", function(data) {
    var majorList = data.split("\n");
    majorList.forEach(major => {
      $('#selectMajor').append($('<option>', {
        value: major,
        text: major
      }));
    });
  });

  $.get("reasons.txt", function(data) {
    var reasonList = data.split("\n");
    reasonList.forEach(reason => {
      $('#selectReason').append($('<option>', {
        value: reason,
        text: reason
      }));
    });
  });

  $.get('activities.txt', function(data) {
    var awardsList = data.split("\n");
    awardsList.forEach(awards => {
      var container = $('#activityList');
      var inputs = container.find('input');
      var id = inputs.length + 1;
      $('<input/>', { type: 'checkbox', id: 'cb' + id, value: awards, class: "awardsCB" }).appendTo(container);
      $('<div/>', { 'for': 'cb' + id, text: awards }).appendTo(container);
    });
  })
  $('.block-tab').on('keydown', function(e) { 
    if (e.keyCode == 9) e.preventDefault(); 
  });
  // info page 1 submit
  $('#page1-submit').click(function(event) {
    event.preventDefault();
    var errors = [
      $("#errTooShort"),
      $("#errTooLong"),
      $("#errCompatible"),
      $("#errMiddleName"),
      $('#errNoBirth'),
      $("#errTooYoung"),
      $("#errTooOld"),
      $("#errAddTo15"),
      $('#errNoEthnicity'),
      $("#errNotDiverse"),
      $("#errNoNum"),
      $('#errWrongFormat'),
      $('#errNoName'),
      $('#errNoSpec'),
      $('#errNotEven'),
      $('#errNotPrime'),
      $('#errInvalidPhoneNumber'),
      $('#errPhoneAddTo45'),
      $('#errInvalidHeight'),
      $('#errHeightTooShort'),
      $('#errHeightTooTall'),
      $('#errInvalidWeight'),
      $('#errTooFat'),
      $('#errTooSkinny'),
      $('#errWeightNotDivisible')];
    errors.forEach(errMsg => {
      errMsg.attr("hidden", true);
    });
    //Name
    var firstName = $('#firstName').val();
    var middleName = $('#midName').val();
    var lastName = $('#lastName').val();
    var fullName = firstName + middleName + lastName;
    var sumOfLetters = 0;
    for (var i = 0; i < fullName.length; i++) {
      sumOfLetters += fullName.charCodeAt(i);
    }
    lovePercentage = sumOfLetters % 100;
    var error = false;
    if (fullName.length < 10) {
      $('#errTooShort').attr("hidden", false);
      error = true;
    }
    else if (fullName.length > 15) {
      $('#errTooLong').attr("hidden", false);
      error = true;
    }
    else if (!middleName.length > 0) {
      $('#errMiddleName').attr("hidden", false);
      error = true;
    }
    else if (lovePercentage < 70) {
      $('#errCompatible').attr("hidden", false);
      error = true;
    }
    if (error){
      document.getElementById("firstName").style.borderColor = "red";
      document.getElementById("lastName").style.borderColor = "red";
      document.getElementById("midName").style.borderColor = "red";
    } else {
      document.getElementById('firstName').style.borderColor = "#00c04b";
      document.getElementById('lastName').style.borderColor = "#00c04b";
      document.getElementById('midName').style.borderColor = "#00c04b";
    }

    var gender = $('#gender').val();
    error = false;
    if (gender.length==0){
      $('#errNoGender').attr("hidden", false);
      error = true;
    }
    if (error){
      document.getElementById("gender").style.borderColor = "red";
    }
    else{
      document.getElementById("gender").style.borderColor = "#00c04b";
    }
    //Birthday
    var birthMonth = parseInt($('#birthMonth').find(":selected").val()||0)
    var birthDate = parseInt($('#birthDate').find(":selected").val()||0);
    var birthYear = parseInt($('#birthYear').find(":selected").val()||0);
    error = false;
    var age = 2024 - birthYear;
    if(birthMonth== 0 || birthDate == 0 || birthYear == 0){
      $('#errNoBirth').attr("hidden", false);
      error = true;
    }
    else if (age < 18) {
      $('#errTooYoung').attr("hidden", false);
      error = true;
    }
    else if (age > 18) {
      $('#errTooOld').attr("hidden", false);
      error = true;
    }
    else if (sumOfDigits(birthMonth) + sumOfDigits(birthDate) + sumOfDigits(birthYear) != 15) {
      $('#errAddTo15').attr("hidden", false);
      error = true;
    }
    if (error){
      document.getElementById('birthMonth').style.borderColor = "red";
      document.getElementById('birthDate').style.borderColor = "red";
      document.getElementById('birthYear').style.borderColor = "red";
    } else {
      document.getElementById('birthMonth').style.borderColor = "#00c04b";
      document.getElementById('birthDate').style.borderColor = "#00c04b";
      document.getElementById('birthYear').style.borderColor = "#00c04b";
    }
    //Email
    var email = $('#email').val();
    var hasNum = false;
    for (var i = 0; i < 10; i++) {
      if (email.includes(i)) {
        hasNum = true;
      }
    }
    error = false;
    if (!email.includes('@') || numChar(email, '@') > 1 || email.lastIndexOf('.') < email.indexOf('@') || email.includes("..")) {
      $('#errWrongFormat').attr("hidden", false);
      error = true;
    }
    else if (containsSpecialCharacters(email)) {
      $('#errNoSpec').attr("hidden", false);
      error = true;
    }
    else if (!email.toLowerCase().includes(fullName.toLowerCase())) {
      $('#errNoName').attr("hidden", false);
      error = true;
    }
    else if (!hasNum) {
      $('#errNoNum').attr("hidden", false);
      error = true;
    }
    if (error){
      document.getElementById("email").style.borderColor = "red";
    } else {
      document.getElementById("email").style.borderColor = "#00c04b";
    }
    //Phone Number
    var phoneNumber = $('#phoneNumber').val();
    error = false;
    if (phoneNumber.length != 10) {
      $('#errInvalidPhoneNumber').attr("hidden", false);
      error = true;
    }
    else if (sumOfDigits(phoneNumber) != 45) {
      $('#errPhoneAddTo45').attr("hidden", false);
      error = true;
    }
    else if (!isPrime(phoneNumber.substring(0, 3))) {
      $('#errNotPrime').attr("hidden", false);
      error = true;
    }
    else if (!everyOtherDigitEven(phoneNumber)) {
      $('#errNotEven').attr("hidden", false);
      error = true;
    }
    if (error){
      document.getElementById('phoneNumber').style.borderColor = "red";
    } else {
      document.getElementById('phoneNumber').style.borderColor = "#00c04b";
    }
    //Race
    var race = $('#race').val();
    error = false;
    if (race == "") {
      $('#errNoEthnicity').attr("hidden", false);
      error = true;
    }
    else if (race != "African American" && race != "Hispanic" && race != "Middle Eastern") {
      $('#errNotDiverse').attr("hidden", false);
      error = true;
    }
    if (error){
      document.getElementById('race').style.borderColor = "red";
    } else {
      document.getElementById('race').style.borderColor = "#00c04b";
    }
    //Height
    var heightFt = parseInt($('#heightFt').val() || 0);
    var heightIn = parseInt($('#heightIn').val() || 0);
    error = false
    if (heightFt < 0 || heightIn < 0 || heightIn > 12 || (heightFt == 0 && heightIn == 0)) {
      $('#errInvalidHeight').attr("hidden", false);
      error = true;
    }
    else if (heightFt < 6) {
      $('#errHeightTooShort').attr("hidden", false);
      error = true;
    }
    else if (heightFt > 6) {
      $('#errHeightTooTall').attr("hidden", false);
      error = true;
    }
    if (error){
      document.getElementById('heightFt').style.borderColor = "red";
      document.getElementById('heightIn').style.borderColor = "red";
    } else {
      document.getElementById('heightFt').style.borderColor = "#00c04b";
      document.getElementById('heightIn').style.borderColor = "#00c04b";
    }
    //Weight
    var weight = parseInt($('#weight').val() || 0);
    error = false;
    if (weight <= 0 || weight == "") {
      $('#errInvalidWeight').attr("hidden", false);
      error = true;
    }
    else if (weight > 250) {
      $('#errTooFat').attr("hidden", false);
      error = true;
    }
    else if (weight < 160) {
      $('#errTooSkinny').attr("hidden", false);
      error = true;
    }
    else if (!(weight % (heightFt + heightIn) === 0)) {
      $('#errWeightNotDivisible').attr("hidden", false);
      error = true;
    }
    if (error){
      document.getElementById('weight').style.borderColor = "red";
    } else {
      document.getElementById('weight').style.borderColor = "#00c04b";
    }
    var canContinue = true;
    errors.forEach((errMsg) => {
      if (!errMsg.attr("hidden")) {
        canContinue = false;
      }
    });
    if (canContinue) {
      document.getElementById("form2").scrollIntoView({ behavior: 'smooth' });
    }
  });

  //info page 2 submit
  $('#page2-submit').click(function(event) {
    event.preventDefault();
    $('#errInvalidGPA').attr("hidden", true);
    $('#errNoSchool').attr("hidden", true);
    $('#errNoLocation').attr("hidden", true);
    $('#errGPATooLow').attr("hidden",true);
    var error = false
    
    var schoolName = $('#schoolName').val();
    if (schoolName == "") {
      $('#errNoSchool').attr("hidden", false);
      error = true;
      document.getElementById('schoolName').style.borderColor = "red";
    }
    var gpa = parseInt($('#GPA').val() || 0);
    if (gpa<=0||gpa>4.0){
      $('#errInvalidGPA').attr("hidden", false);
      error = true;
      document.getElementById('GPA').style.borderColor = "red";
    }
    else if (gpa<4.0){
      $('#errGPATooLow').attr("hidden",false);
      error = true;
      document.getElementById('GPA').style.borderColor = "red";
    }

    var location = $('#location').val();
    if (location == "") {
      $('#errNoLocation').attr("hidden", false);
      document.getElementById('location').style.borderColor = "#red";
      error = true;
    }
    
    if (!error) {
      document.getElementById('GPA').style.borderColor = "#00c04b";
      document.getElementById('schoolName').style.borderColor = "#00c04b";
      document.getElementById('location').style.borderColor = "#00c04b";
    }
    
    if (!error) {
      document.getElementById("form3").scrollIntoView({ behavior: 'smooth' });
    }
  });

  //info page 3 submit
  $('#page3-submit').click(function(event) {
    event.preventDefault();
    var errors = [
      $('#errTeacherTooShort'),
      $('#errTeacherNoZ'),
      $('#errTeacherNoSpec'),
      $('#errTeacherHasNum'),
      $('#errTeacherWrongFormat'),
      $('#errTeacherNoName'),
      $('#errNoSubject'),
      $('#errNotMath'),
    ];

    errors.forEach((errMsg) => {
      errMsg.attr("hidden", true);
    });
    //Teacher
    var teacherName = $('#teacherName').val();
    if (teacherName.includes(" ")){
      const teacherNames = teacherName.split(" ");
      teacherName = teacherNames[0]+teacherNames[1];
    }
    var error = false;
    if (teacherName.length < 10) {
      $('#errTeacherTooShort').attr("hidden", false);
      error = true;
    }
    else if (!teacherName.includes('z')) {
      $('#errTeacherNoZ').attr("hidden", false);
      error = true;
    }
    if (error){
      document.getElementById('teacherName').style.borderColor = "red";
    } else {
      document.getElementById('teacherName').style.borderColor = "#00c04b";
    }
    //Teacher Email
    var teacherEmail = $('#teacherEmail').val();
    var hasNum = false;
    for (var i = 0; i < 10; i++) {
      if (teacherEmail.includes(i)) {
        hasNum = true;
      }
    }
    error = false;
    teacherEmail.replace("\s", "");
    if (!teacherEmail.includes('@') || numChar(teacherEmail, '@') > 1 || teacherEmail.lastIndexOf('.') < teacherEmail.indexOf('@') || teacherEmail.includes("..")) {
      $('#errTeacherWrongFormat').attr("hidden", false);
      error = true;
    }
    else if (containsSpecialCharacters(teacherEmail)) {
      $('#errTeacherNoSpec').attr("hidden", false);
      error=  true;
    }
    else if (hasNum) {
      $('#errTeacherHasNum').attr("hidden", false);
      error = true;
    }
    else if (!teacherEmail.toLowerCase().includes(teacherName.toLowerCase())) {
      $('#errTeacherNoName').attr("hidden", false);
      error = true;
    }
    if (error){
      document.getElementById('teacherEmail').style.borderColor = "red";
    } else {
      document.getElementById('teacherEmail').style.borderColor = "#00c04b";
    }
    //Subject
    var subject = $('#subject').val();
    error = false;
    if(subject == ""){
      $('#errNoSubject').attr("hidden", false);
      error = true;
    }
    else if (subject != "Math" && subject != "math") {
      $('#errNotMath').attr("hidden", false);
      error = true;
    }
    if (error){
      document.getElementById('subject').style.borderColor = "red";
    } else {
      document.getElementById('subject').style.borderColor = "#00c04b";
    }
    var canContinue = true;
    errors.forEach((errMsg) => {
      if (!errMsg.attr("hidden")) {
        canContinue = false;
      }
    });
    if (canContinue) {
      document.getElementById("form4").scrollIntoView({ behavior: 'smooth' });
    }
  });

  $('#page4-submit').click(function(event) {
    event.preventDefault();
    errors = [
      $('#errNoMajor'),
      $('#errNoChance'),
      $('#errNoWhy'),
      $('#errWrongWhy'),
      $('#errNotEnough')];
    errors.forEach((errMsg) => {
      errMsg.attr("hidden", true);
    });
    //Major
    var major = $('#selectMajor').val();
    error = false;
    if(major==""){
      $('#errNoMajor').attr("hidden", false);
      error = true;
    }
    else if (major.includes("Math") || major.includes("Physics") || major.includes("Chemistry") || major.includes("Computer Science") || major.includes("Engineering")) {
      $('#errNoChance').attr("hidden", false);
      error = true;
    }
    if (error){
      document.getElementById('selectMajor').style.borderColor = "red";
    } else {
      document.getElementById('selectMajor').style.borderColor = "#00c04b";
    }
    //Why this college
    var why = $('#selectReason').val();
    error = false;
    if(why=="" || !why){
      $('#errNoWhy').attr("hidden", false);
      error = true;
    }
    else if (why != "This is my dream school. I literally have not applied anywhere else. I pray every night to get into this school.") {
      $('#errWrongWhy').attr("hidden", false);
      error = true;
    }
    if (error){
      document.getElementById('selectReason').style.borderColor = "red";
    } else {
      document.getElementById('selectReason').style.borderColor = "#00c04b";
    }
    var activitiesEnough = true;
    var activityListCB = $(".awardsCB");
    activityListCB.each(function() {
      if (!$(this).is(":checked")) {
        activitiesEnough = false;
      }
    });
    if (!activitiesEnough) {
      $('#errNotEnough').attr("hidden", false);
    }

    var canContinue = true;
    errors.forEach(errMsg => {
      if (!errMsg.attr("hidden")) {
        canContinue = false;
      }
    });

    if (canContinue) {
      document.getElementById("form5").scrollIntoView({ behavior: 'smooth' });
    }
  });

  $('#page5-submit').click(function(event) {
    event.preventDefault();
    errors = [
      $('#errInvalidCardNum'),
      $('#errCardNumAddTo77'),
      $('#errCardNumNotDivisibleBy2'),
      $('#errCardNumNotDivisibleBy5'),
      $('#errInvalidExpDate'),
      $('#errCardExpired'),
      $('#errInvalidSecurityCode'),
      $('#errSecurityCodeNotEven')
    ];
    errors.forEach((errMsg) => {
      errMsg.attr("hidden", true);
    });
  
    //Credit card number
    var creditCard = $('#creditCard').val();
    var error = false;
    if (creditCard.length != 16) {
      $('#errInvalidCardNum').attr("hidden", false);
      error = true;
    }
    else if (sumOfDigits(creditCard) != 77) {
      $('#errCardNumAddTo77').attr("hidden", false);
      error = true;
    }
    else if (creditCard % 2 != 0) {
      $('#errCardNumNotDivisibleBy2').attr("hidden", false);
      error = true;
    }
    else if (creditCard % 5 != 0) {
      $('#errCardNumNotDivisibleBy5').attr("hidden", false);
      error = true;
    }
    if (error){
      document.getElementById('creditCard').style.borderColor = "red";
    } else {
      document.getElementById('creditCard').style.borderColor = "#00c04b";
    }
    //Expiration Date
    var expirationMonth = $('#expirationMonth').val();
    var expirationYear = $('#expirationYear').val();
    error = false
    if (expirationMonth <= 0 || expirationMonth > 12 || expirationYear <= 0 || expirationYear > 99) {
      $('#errInvalidExpDate').attr("hidden", false);
      error = true;
    }
    else if (expirationYear < 24 || (expirationYear == 24 && expirationMonth < 5)) {
      $('#errCardExpired').attr("hidden", false);
      error = true;
    }
    if (error){
      document.getElementById('expirationMonth').style.borderColor = "red";
      document.getElementById('expirationYear').style.borderColor = "red";
    } else {
      document.getElementById('expirationMonth').style.borderColor = "#00c04b";
      document.getElementById('expirationYear').style.borderColor = "#00c04b";
    }
    //Security Code
    var securityCode = $('#securityCode').val();
    error = false;
    if (securityCode.length != 3) {
      $('#errInvalidSecurityCode').attr("hidden", false);
      error = true;
    }
    else if (securityCode % 2 != 0) {
      $('#errSecurityCodeNotEven').attr("hidden", false);
      error = true;
    }
    if (error){
      document.getElementById('securityCode').style.borderColor = "red";
    } else {
      document.getElementById('securityCode').style.borderColor = "#00c04b";
    }

    var canContinue = true;
    errors.forEach(errMsg => {
      if (!errMsg.attr("hidden")) {
        canContinue = false;
      }
    });
    if(canContinue) {
      document.getElementById("form6").scrollIntoView({ behavior: 'smooth' });
    }
  });
});
