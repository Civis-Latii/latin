import random
from core_lexicon.words import Word

class QuizEngine:
    def __init__(self):
        
        # Initialising all attributes
        # This is good practice to prevent developers
        # digging through code to find all attributes  
        self.quiz_is_finished = False

        # Do not type hint every variable
        # This creates visual clutter and most of the time
        # the purpose is obvious
        # The exception is when you have an empty container
        # e.g., vocab - then you should hint at what it will contain

        # vocab is a list as opposed to a set beacuse sets are unordered, not random
        # this means that they are assigned a random location in memory while the program is running
        # so if the user clicks test same vocab without reloading the page, it will be the same order
        # this is bad because it just becomes a memorisation game
        self.vocab: list[Word] = []
        self.number_of_questions = 0
        self.questions_faced = 0
        self.correct_answers = 0

        # incorrect_answers is a set as opposed to a list
        # as this removes the need to check whether a word is
        # already in the list in check_answer
        self.incorrect_answers: set[Word] = set()

        self.random_word = None

    def debug(self) -> str:
        return(f"Debug message: Debugging")

    # With QuizEngine as the forklift storing Word boxes from the Lexicon
    # warehouse, init is the blueprint for the empty forklift, while
    # initialise quiz populates it with new boxes
    def initialise_quiz(self, new_vocab: list):
        self.quiz_is_finished = False

        self.vocab = new_vocab
        self.number_of_questions = len(self.vocab)
        self.questions_faced = 0

        # This is incremented before every question
        # So starts from 1 at minimum (and prevents ZeroDivisionError)
        self.correct_answers = 0      

        # Calling {} creates an empty dictionary, not a set
        # To create an empty set you need to call set()
        self.incorrect_answers = set()

        self.random_word = None

    def next_question(self) -> dict:
        self.questions_faced += 1
        random_index = random.randrange(0, len(self.vocab))
        self.random_word = self.vocab.pop(random_index)
        question_text = self.random_word.ask_question()
        return {
            "status": "OK",
            "content": question_text,
            "current_question_finished": False,
            "quiz_is_finished": False
        }
    
    def check_answer(self, user_answer: str) -> dict:
        """
        Checks the user's answer.

        Args:
            user_answer: the answer input by the user in the frontend

        Returns:    
            A dictionary containing:

            * `status` (str): "correct", "incorrect", or "error"
            * `content` (str | None): answers if correct
            * `current_question_finished` (bool | None): True if correct
            * `quiz_is_finished` (bool | None): True if final question is correct
        """

        # This tester uses a 'nice' format
        # This means that users can try to check answers
        # as many times as they want with no penalty
        # i.e., questions_faced and score will remain constant
        # Questions will only be marked as incorrect if the user clicks skip

        # Functions with 'if' return blocks and ending with a fallback return
        # block utilise the 'early return pattern'
        # i.e., if certain conditions are met, the function returns
        # before going through every line of code
        if self.random_word is None:
            return {
                "status": "error",
                "content": "checked answer with random_word as None",

                # The values are none because there is no quiz or question
                "current_question_finished": None,
                "quiz_is_finished": None
                }
              
        correct = self.random_word.check_answer(user_answer)
        if correct:
            self.correct_answers += 1
            self.quiz_is_finished = self.questions_faced == self.number_of_questions
            return {
                "status": "correct",
                "content": self.random_word.english,
                "current_question_finished": True,
                "quiz_is_finished": self.quiz_is_finished
            }
        
        # Since incorrect_answers is a set, you don't need to check
        # whether random_word already exists in the set
        # This also removes the need for a dedicated return message
        # to signal that random_word is already in incorrect_answers
        # which would require explicit checking in the frontend
        self.incorrect_answers.add(self.random_word)

        # This final return block if all the above conditions are false
        # is called a 'fallback/default return' - i.e., it is the default which
        # the program 'falls back on' if none of the conditions for the
        # other return branches are met
        # In this way, it is an unofficial 'else' statement without
        # the visual indentation nightmare
        # this is a catch-all/fallback return block
        # triggered if correct evaluates to false
        # thus it is like 'else'
        return {
            "status": "incorrect",

            # .content is not accessed by the frontend when incorrect
            # so None is better than a ghost string
            "content": None,

            # Hardcoded to false because while user is not correct
            # and has not pressed skip, the question/quiz isn't over
            "current_question_finished": False,
            "quiz_is_finished": False
        }

    def skip_question(self) -> dict:
        """
        Skips the current question.

        Returns:
            A dictionary containing:

            * `status` (str): "error" | "skipped"
            * `content` (str): error message | correct answers
            * `current_question_finished` (bool | None): True if word is not None
            * `quiz_is_finished` (bool | None): True if this is the last question

        """

        # Guard check for the question is skipped when random_word is None
        # i.e., if the quiz is started without any categories having been selected
        # This is physically impossible; this is so Pylance doesn't get angry
        if self.random_word is None:
            return {
                "status": "error",
                "content": "skipped question with random_word as None",
                "current_question_finished": None,
                "quiz_is_finished": None
            }
        
        answers = self.random_word.english
        self.quiz_is_finished = self.questions_faced == self.number_of_questions

        return {
            "status": "skipped",
            "content": answers,
            "current_question_finished": True,
            "quiz_is_finished": self.quiz_is_finished
        }

    def quiz_stats(self) -> dict:
        """
        Returns the current quiz stats.

        Returns:
            A dictionary containing:
            
                * `score_fraction` (str): correct answers / questions faced (unsimplified fraction)
                * `score_percentage` (str): correct answers / questions faced (2 d.p.)
                * `progress_fraction` (str): questions faced / number of questions (unsimplified fraction)
        """

        return {
            "score_fraction": f"{self.correct_answers}/{(self.questions_faced)}",
            "score_percentage": f"{100*self.correct_answers/(self.questions_faced) if self.questions_faced != 0 else 0:.2f}%",
            "progress_fraction": f"{(self.questions_faced)}/{self.number_of_questions}"
        }
 
# The backend should be responsible for 'business rules'
# i.e., if this quiz was played on paper flashcards, the backend
# should decide what the rules are
# the frontend should decide what the UI looks like
# e.g., should button A B C be enabled/disabled