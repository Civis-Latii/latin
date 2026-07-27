from core_lexicon.lexicon import Lexicon
from .quiz_engine import QuizEngine
from flask import Flask, request
from flask_cors import CORS
from uuid import uuid4

# Creates the Flask 'post office'
# this translates JSON letters between Python and JS
# Flask is reactive
app = Flask(
    __name__,
    template_folder="/home/Latium/latin/latinvocabtester/templates",
    static_folder="/home/Latium/latin/latinvocabtester/templates"
    )

# Cross-Origin-Resource-Sharing
# Allows JS to get resources with Python
CORS(app)

with open("/home/Latium/latin/core_data/vocab_list.txt") as file:
    vocab_list = file.read()

lexicon = Lexicon(vocab_list)

quizzes: dict[str, QuizEngine] = {}

@app.post("/initialise_quiz")
def initialise_quiz():
    categories = request.get_json()

    # No longer using if self.categories[word.word_type] == True
    # Python automatically evaluates boolean expressions
    # That created redundancy
    # This is more Pythonic
    vocablist = [word for word in lexicon.words if categories[word.word_type]]

    # generates a random 128-digit ID for each user
    # calling str because uuid4 returns a UUID object
    # and flask needs it to be str to send to frontend
    # since JS has no idea what UUID is
    # (can only send JSON to frontend remember - plaintext dict)
    session_ID = str(uuid4())
    quiz = QuizEngine()
    quiz.initialise_quiz(vocablist)

    # each user accesses the quiz object linked to their specific session ID
    quizzes[session_ID] = quiz
    return {
        "status": "OK",
        "session_ID": session_ID
        }

@app.post("/next_question")
def next_question() -> dict:
    response = request.get_json()
    session_ID = response["session_ID"]
    quiz = quizzes[session_ID]
    return quiz.next_question()

@app.post("/check_answer")
def check_answer() -> dict:
    response = request.get_json()
    session_ID = response["session_ID"]
    quiz = quizzes[session_ID]
    user_answer = response["user_answer"]
    return quiz.check_answer(user_answer)

@app.post("/quiz_stats")
def return_quiz_stats() -> dict:
    response = request.get_json()
    session_ID = response["session_ID"]
    quiz = quizzes[session_ID]
    return quiz.quiz_stats()

@app.post("/skip_question")
def skip_question() -> dict:
    response = request.get_json()
    session_ID = response["session_ID"]
    quiz = quizzes[session_ID]
    return quiz.skip_question()

@app.post("/next_steps")
def next_steps():
    response = request.get_json()
    session_ID = response["session_ID"]
    quiz = quizzes[session_ID]
    user_choice = response["user_choice"]

    if user_choice == "test_same_vocab":

        quiz.initialise_quiz(quiz.vocab)
        return {"status": "same_vocab"}
    
    if user_choice == "test_incorrect_vocab":

        # incorrect_answers will be overwritten to empty set
        # by initialise_quiz
        # so passing incorrect_answers as a parameter
        # would pass the reference to a set that would be overwritten
        # Therefore I use list() to create a new list in memory
        # that will not be overwritten
        # (vocab is stored as a list, not a set)
        quiz.initialise_quiz(list(quiz.incorrect_answers))
        return {"status": "incorrect_vocab"}
    
    return {
        "status": "error",
        "content": "Unexpected input for user_choice. Maybe check frontend?"
        }

if __name__ == "__main__":
    app.run()