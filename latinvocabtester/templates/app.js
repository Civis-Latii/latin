
const categories = {
    "nouns1": false,
    "nouns2": false,
    "nouns3": false,
    "nouns4": false,
    "nouns5": false,
    "verbs1": false,
    "verbs2": false,
    "verbs3": false,
    "verbs4": false,
    "irregularVerbs": false,
    "deponentVerbs": false,
    "adjectives212": false,
    "adjectives33": false,
    "comparativeAdjectives": false,
    "adverbs": false,
    "pronouns": false,
    "prepositions": false,
    "conjunctions": false,
    "miscellaneous": false,
    "numerals": false
}

const category_button_names = {
    "nouns1": "Nouns 1",
    "nouns2": "Nouns 2",
    "nouns3": "Nouns 3",
    "nouns4": "Nouns 4",
    "nouns5": "Nouns 5",
    "verbs1": "Verbs 1",
    "verbs2": "Verbs 2",
    "verbs3": "Verbs 3",
    "verbs4": "Verbs 4",
    "irregularVerbs": "Irregular Verbs",
    "deponentVerbs": "Deponent Verbs",
    "adjectives212": "Adjectives 2-1-2",
    "adjectives33": "Adjectives 3-3",
    "comparativeAdjectives": "Comparative Adjectives",
    "adverbs": "Adverbs",
    "pronouns": "Pronouns",
    "prepositions": "Prepositions",
    "conjunctions": "Conjunctions",
    "miscellaneous": "Miscellaneous",
    "numerals": "Numerals"
}

const category_buttons_container = document.getElementById("category_buttons_container")

for (const category of Object.keys(categories)) {
    const button = document.createElement("button")
    button.dataset.category = category
    button.classList.add("category_buttons")
    button.textContent = category_button_names[category]
    button.addEventListener("click", function() {
        categories[category] = !categories[category]
        const categories_selected = Object.values(categories).includes(true)
        document.getElementById("start_quiz").disabled = !categories_selected
        // It is good practice to directly assign boolean expressions
        // if/else is unnecessary here
        // object.values(categories).includes(true) is inverted
        // this means that if any categories are selected, start quiz is !disabled (not disabled)
        // so users can use it normally when categories are selected
    })
    category_buttons_container.append(button)
}

document.getElementById("start_quiz").addEventListener("click", async function() {
    const response = await fetch("http://127.0.0.1:5000/initialise_quiz", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(categories)
    })
    const data = await response.json()
    const session_ID = data.session_ID
    sessionStorage.setItem("session_ID", session_ID)
    window.location.assign("/quizpage/index.html")    
})
