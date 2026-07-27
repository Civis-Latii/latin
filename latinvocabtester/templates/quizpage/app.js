let session_ID = null

// This is global to satisfy the DRY (don't repeat yourself) principle
// since the exact same header is used 6x in this program
const JSON_header = {"Content-Type": "application/json"}

// Set up the first question the moment the page loads
document.addEventListener("DOMContentLoaded", function() {

    /*
      Making sure everything has loaded before extracting
      session ID from sessionStorage
      this makes the logic more resilient and is best practice
      In JS you don't need to say global var
      if a variable doesn't exist in the function scope,
      JS will look at the global scope to try and find it
      This has to go before next_question() et al. because
      otherwise it would send session_ID = null to backend
      and cause a crash!
    */
    session_ID = sessionStorage.getItem("session_ID")

    next_question()
    update_quiz_stats()
})

const elements = {
    check_answer: document.getElementById("check_answer"),
    navigator_button: document.getElementById("navigator_button"),
    answer_box: document.getElementById("answer_box"),
    question_text: document.getElementById("question_text"),
    answers_and_status: document.getElementById("answers_and_status"),
    quiz_stats: document.getElementById("quiz_stats"),
    exit: document.getElementById("exit"),
    test_same_vocab: document.getElementById("test_same_vocab"),
    test_incorrect_vocab: document.getElementById("test_incorrect_vocab")
}

function update_elements(data) {

    elements.check_answer.disabled = data.current_question_finished

    elements.navigator_button.dataset.state = data.current_question_finished ? "next" : "skip"
    elements.navigator_button.textContent = data.current_question_finished ? "Next Question" : "Skip Question"

    elements.navigator_button.disabled = data.quiz_is_finished
    elements.test_same_vocab.disabled = !data.quiz_is_finished
    elements.test_incorrect_vocab.disabled = !data.quiz_is_finished

}

/*
  async function just declares that this function is async
  i.e., the code does other stuff while waiting for the promise to resolve
  imagine a barista
  him serving coffee a person at a time is synchronous
  him giving you a buzzer and moving on to process others is async
  you waiting for your coffee to be made is you await-ing
  (waiting for the promise to be resolved)
 */
async function next_question() {

    // await fetch() is like streaming a video
    // before it arrives there is only a promise object (what fetch() returns)
    // as soon as the headers start arriving though it ceases to be a promise
    // and becomes a tangible 'thing' you can start streaming
    // even though the whole thing has not arrived
    const response = await fetch("127.0.0.1:5000/next_question", {
        method: "POST",
        headers: JSON_header,
        body: JSON.stringify({
            "session_ID": session_ID
        })
    })

    /*
      await next_question_text is like waiting for a transcript
      you need the whole 'video' to load before the transcript can be made
      so before the 'video' has completely loaded you have a promise
      (returned by await)
      and when the 'video' has finished loading
      the transcript can be made
    */
    const data = await response.json()
    elements.question_text.textContent = data.next_question

    update_elements(data)
    /*
      Since next_question is part of a distinct 'reset stage'
      the UI updates for the reset stage are also here
      Meanwhile, all the UI updates during the 'quiz stage'
      belong in update_elements
    */
    elements.answer_box.value = ""
    elements.answers_and_status.textContent = ""

}

async function skip_question() {
    const response = await fetch("127.0.0.1:5000/skip_question", {
        method: "POST",
        headers: JSON_header,
        body: JSON.stringify({
            "session_ID": session_ID
        })
    })
    const data = await response.json()

    if (data.status == "error") {
        elements.answers_and_status.textContent = data.content
        return
    }

    elements.answer_box.value = data.content
    elements.answers_and_status.textContent = `Skipped! Answers: ${data.content}`
    update_quiz_stats()
    update_elements(data)
}

async function update_quiz_stats() {
    // Using response instead of update_quiz_stats_response for readability
    // This prevents clutter and is good practice
    const response = await fetch("127.0.0.1:5000/quiz_stats", {
        method: "POST",
        headers: JSON_header,
        body: JSON.stringify({
            "session_ID": session_ID
        })
    })
    const data = await response.json()
    const quiz_stats = `
    Score: ${data.score_fraction} |
    ${data.score_percentage} |
    Progress: ${data.progress_fraction}`
    elements.quiz_stats.textContent = quiz_stats
}

async function check_answer() {
    const response = await fetch("127.0.0.1:5000/check_answer", {
        method: "POST",
        headers: JSON_header,
        body: JSON.stringify({
            "session_ID": session_ID,
            "user_answer": elements.answer_box.value
        })
    })
    const data = await response.json()

    if (data.status == "error") {
        elements.answers_and_status.textContent = `Error: ${data.content}`

        // Utilising the early return pattern to avoid else
        // This makes code cleaner and easier to debug
        return
    }

    // Early return pattern is not being used here because
    // there is no data to return.
    // Simply, there are different branches that run depending
    // on status, and a universal update_elements(data) at the bottom
    if (data.status == "correct") {
        elements.answers_and_status.textContent = `Correct! Answers: ${data.content}`
        update_quiz_stats()
    }

    // Early return patterns should only use catch-alls in place of else
    // since incorrect is an "elif" it shouldn't be a catch-all
    if (data.status == "incorrect") {
        elements.answers_and_status.textContent = "Incorrect! Try again!"
    }

    update_elements(data)
}

elements.check_answer.addEventListener("click", check_answer)
elements.answer_box.addEventListener("keydown", function(event) {
    if (event.key == "Enter") {
        check_answer()
    }
})

elements.navigator_button.addEventListener("click", function() {
    const current_state = elements.navigator_button.dataset.state
    if (current_state == "skip") {
        skip_question()
    }

    if (current_state == "next") {
        next_question()
    }

})

elements.exit.addEventListener("click", function() {
    window.location.assign("../index.html")
})

elements.test_same_vocab.addEventListener("click", async function() {
    await fetch("127.0.0.1:5000/next_steps", {
        method: "POST",
        headers: JSON_header,
        body: JSON.stringify({
            "session_ID": session_ID,
            "user_choice": "test_same_vocab"
        })
    })
    await update_quiz_stats()
    next_question()
})

elements.test_incorrect_vocab.addEventListener("click", async function() {
    await fetch("127.0.0.1:5000/next_steps", {
        method: "POST",
        headers: JSON_header,
        body: JSON.stringify({
            "session_ID": session_ID,
            "user_choice": "test_incorrect_vocab"
        })
    })
    await update_quiz_stats()
    next_question()
})
