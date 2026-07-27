from .words import Word, Noun, NotNoun

class Lexicon:
    def __init__(self, text: str):
        self.word_type = [
            "nouns1", 
            "nouns2", 
            "nouns3", 
            "nouns4", 
            "nouns5", 
            "verbs1", 
            "verbs2", 
            "verbs3", 
            "verbs4", 
            "irregularVerbs", 
            "deponentVerbs", 
            "adjectives212", 
            "adjectives33", 
            "comparativeAdjectives", 
            "adverbs", 
            "pronouns", 
            "prepositions", 
            "conjunctions", 
            "miscellaneous", 
            "numerals"
        ]
        self.categories = {
            "nouns1": True, 
            "nouns2": False, 
            "nouns3": False, 
            "nouns4": False, 
            "nouns5": False, 
            "verbs1": False, 
            "verbs2": False, 
            "verbs3": False, 
            "verbs4": False, 
            "irregularVerbs": False, 
            "deponentVerbs": False, 
            "adjectives212": False, 
            "adjectives33": False, 
            "comparativeAdjectives": False, 
            "adverbs": False, 
            "pronouns": False, 
            "prepositions": False, 
            "conjunctions": False, 
            "miscellaneous": False, 
            "numerals": False
        }

        self.words: list[Word] = self.return_words(text)

    def create_word(self, parts: list[str], current_word_type: str) -> Word:
        if current_word_type.startswith("nouns"):
            return Noun(parts[0], parts[1], parts[2], parts[3], current_word_type)
        
        # if-chaining is used here because it creates standalone checks
        # this is good practice and considered cleaner and easier to debug
        if current_word_type.startswith("verbs") or current_word_type.endswith("Verbs"):
            return NotNoun(parts[0], parts[1], parts[2], current_word_type)
        
        if current_word_type.startswith("adjectives") or current_word_type.endswith("Adjectives"):
            return NotNoun(parts[0], parts[1], parts[2], current_word_type)
        
        # Note that all categories save Nouns return NotNoun
        # This is because I plan to add more functionality with different word type in the future
        # However, for now, the catch-all NotNoun works fine, so it stays
        # The verbs and adjectives clauses are for demonstrative purposes
        
        # A catch-all return is used here
        # Else is not used because as mentioned above ^ it gets messy
        # This is the industry standard and considered good practice
        return NotNoun(parts[0], parts[1], parts[2], current_word_type)

    def return_words(self, text: str) -> list[Word]:
        current_word_type = ""
        wordlist = []

        for line in text.split('\n'):
            if not line:
                continue
            if line in self.word_type:
                current_word_type = line
                continue
            
            # Word parts are delimited by " | "
            # as this makes modification in the text file easier
            parts = [part.strip() for part in line.split("|")]
            word = self.create_word(parts, current_word_type)
            wordlist.append(word)

        return wordlist
