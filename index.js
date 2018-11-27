// we have an array of objects that contain:
// Question(Key) - string(Value)
// Choices(Key) - Array(Value)
// Answer(Key) - string(Value)
const quizList = [
    {
      question: "What was the purpose of General Sherman’s March to the Sea?",
      choices: [
        "To capture Confederate president Jefferson Davis in Savannah, GA.",
        "To fight a French fleet that had arrived in the United States to help the South.",
        "To destroy everything in Georgia so that the south would lose hope that they could win.",
        "To punish Southerners for the assassination of President Lincoln."
      ],
      answer: "c"
    },
    {
      question:
        "Which technological advance in the 1920’s and 1930’s caused over farming and the destruction of many farms when a drought hit (farmers soon learned better techniques)?",
      choices: ["Contour farming", "Tractor", "Plow", "Windbreaks"],
      answer: "b"
    },
    {
      question:
        "What was the novel that was written by Harriet Beecher Stowe to describe the horrors of slavery?",
      choices: [
        "Uncle Tom’s cabin",
        "Harriet Tubman’s Life Story",
        "Abraham Lincoln’s Views on Slavery",
        "The Biography of John Brown"
      ],
      answer: "a"
    },
    {
      question:
        "When a person makes a plan about how to save and spend their money, they are creating a(n) ______________.",
      choices: ["Economy", "Personal Budget", "Market", "Competition"],
      answer: "b"
    },
    {
      question:
        "Hundreds of thousands of people couldn’t find jobs during the great depression. Many people who couldn’t find work couldn’t afford to buy food so they had to go to ____________________.",
      choices: ["Homeless shelters", "Food stamps", "WIC", "Soup kitchens"],
      answer: "d"
    },
    {
      question:
        "Which event was the turning point of World War II in Europe? After this event Germany was continually pushed back until its defeat in 1945.",
      choices: [
        "The forming of the United Nations",
        "The D-Day invasion",
        "V-E Day",
        "The Tuskegee Air Assault"
      ],
      answer: "b"
    },
    {
      question: "Which event caused the United States to join WWII?",
      choices: [
        "The bombing of Pearl Harbor by the Japanese",
        "The dropping of the atomic bombs on Hiroshima and Nagasaki",
        "The D-Day Invasion",
        "The attack on Iwo Jima"
      ],
      answer: "a"
    },
    {
      question:
        "The Cold War was mostly a competition between the United States and",
      choices: ["Great Britain.", "the Soviet Union", "Germany", "Poland"],
      answer: "b"
    },
    {
      question: "Americans' fear of communism following World War II led to",
      choices: [
        "invitations to the White House",
        "a hunt for Communists by Joseph McCarthy",
        "tolerance of people with different views",
        "war with China"
      ],
      answer: "b"
    },
    {
      question:
        "What event in the 1960's brought the world close to a nuclear war?",
      choices: [
        "Apollo Project",
        "Berlin Wall.",
        "Bay of Pigs",
        "Cuban Missile Crisis"
      ],
      answer: "d"
    }
  ];
  // global variable initalizations
  let currentQuestionIndex = 0;
  let correctAnswer = 0;
  let incorrectAnswer = 0;
  let currentQuestion = {};
  let pickedAnswer = undefined;
  let score = 0;
  
  // display the correct count and incorrect count,
  //  also display the current question index count with the length of the
  // quizList array. To show question they are on.
  let displayQuestionIndex = () => {
    $("#display-count").html(
      " Correct: " + correctAnswer + " Incorrect: " + incorrectAnswer
    );
    $("#display-header").html(
      "Question " + (currentQuestionIndex + 1) + " of " + quizList.length + "."
    );
  };
  
  // display the score variable and change the css to display block.
  let displayScore = () => {
    $("#displayed-score").html(score + "%");
    $(".score-card").css("display", "block");
  };
  
  // hides the question by changing the css to display none.
  let hideQuestion = () => {
    $(".question-card").css("display", "none");
  };
  
  // set a score value equal to correct answer divided by the length of
  // the quizList array multiplied by 100 to get a percentage.
  let calculateScore = () => {
    score = (correctAnswer / quizList.length) * 100;
  };
  
  // increments the current question index by 1,
  // if the answer from the quizList array is equal to
  // the picked answer we increment the correctAnswer counter by
  // 1 and return true so check can use it for displayFeedback otherwise,
  // increment incorrectAnswer by 1 and return false.
  let checkAnswer = () => {
    currentQuestionIndex += 1;
    if (currentQuestion.answer === pickedAnswer) {
      correctAnswer += 1;
      return true;
    }
    incorrectAnswer += 1;
    return false;
  };
  
  // Jquery focuses on the answerFeedback div, to pass in
  // the feed (class) from the displayFeedback method which could
  // either be correct of incorrect.
  // when the answer choice is incorrect then we will toggleClass to have a showCorrect class
  // in the html highlight the correct answer via CSS
  // Removes the class after 1 second.
  animateFeedback = feed => {
    $("#answerFeedback").toggleClass(feed);
    let showCorrect = $(`input[value='${currentQuestion.answer}']`);
    if (feed === "incorrect") {
      showCorrect.parent().toggleClass("showCorrect");
    }
  
    setTimeout(() => {
      $("#answerFeedback").removeClass();
      showCorrect.parent().removeClass("showCorrect");
    }, 1000);
  };
  
  // which takes in a boolean parameter
  // calls the animateFeedback with either correct or
  // incorrect based on the boolean
  let displayFeedback = check => {
    if (check) {
      animateFeedback("correct");
    } else {
      animateFeedback("incorrect");
    }
  };
  
  // inserts the current question from the quizList array using an index, jquery inserts it to the html.
  let insertQuestion = () => {
    currentQuestion = quizList[currentQuestionIndex];
    $("#question").html(currentQuestion.question);
    $("#choice1").html(currentQuestion.choices[0]);
    $("#choice2").html(currentQuestion.choices[1]);
    $("#choice3").html(currentQuestion.choices[2]);
    $("#choice4").html(currentQuestion.choices[3]);
    $("#answer").html(currentQuestion.answer);
  };
  
  // listens for submit answer btn
  // checks the answer displays the feedback on the screen as a check or cross mark
  // thru the css/html. if question count matches the length of the array then you
  // are done with the quiz which will call the hideQuestion (hides the question),
  // calculateScore (calculates the score), displayScore (displays the score).
  // otherwise it will insert another question on a timer for 1 second.
  let handleFeedback = () => {
    displayFeedback(checkAnswer());
    if (currentQuestionIndex === quizList.length) {
      hideQuestion();
      calculateScore();
      displayScore();
    } else {
      $("input[name='choice']:checked").prop("checked", false);
      setTimeout(() => {
        displayQuestionIndex();
        insertQuestion();
      }, 1000);
    }
  };
  
  // listens for the submit button click, prevents the default action, store the picked radio value,
  // if the picked answer choise is not equal to undefied (which means something was selected)
  // we call handle feedback otherwise
  // user gets promted to select an answer choice.
  let submitAnswerEvent = () => {
    $("input[type='button']").click(event => {
      event.preventDefault();
      pickedAnswer = $("input[name='choice']:checked").val();
      if (pickedAnswer !== undefined) {
        handleFeedback();
      } else {
        alert("Whoops, Please select an answer choice.");
      }
    });
  };
  
  // This is the start of the quiz, when you press start
  // it listens to the button click and will call the insert
  // questions and displays the question index and uses jquery to hide the start btn
  // but shows the questions.
  let startQuizEvent = () => {
    $("#start-btn").click(() => {
      $("#start-btn-container").css("display", "none");
      $(".question-card").css("display", "block");
      $(".header-title").toggleClass("activep");
      insertQuestion();
      displayQuestionIndex();
    });
  };
  
  // main event function caller main events are
  // start quiz and listen for submit answer btn
  let mainFunctionCaller = () => {
    startQuizEvent();
    submitAnswerEvent();
  };
  
  //jquery main method short hand version of $().ready();
  $(mainFunctionCaller);
  