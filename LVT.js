
let text = text.text()

 
function m(v){} {//v = verblist
    len = int(len(v)/3-1)
    for (i in range(length))
    {    //#do it for the amt of items in list / 3 (each word has 3 parts) - 1 (list divisible by 3, so this prevents going out of bounds)
        ans = ""
        rc = random.randrange(0,len(v)-3,3) //random choice (start at 0 as it is a list, indexed from 0)
        if (v[rc+1] != "-")
            print("$v[rc]}, ${v[rc+1]}") 
        else
            print("${v[rc]}") //accounting for inquit and prepositions
        ans = input("Enter your answer: ").lower()
        if (ans (not in v[rc+2].lower().split(", ")) &&  ans != "break" && ans != "gohome")
            while (ans (not in v[rc+2].split(", ")) && (ans != "break" && ans != "gohome"))
                print("Incorrect! Try again! ")
                ans = input("Enter your answer: ")
        if (ans == "gohome")
            return //change so that there is just an exit button
        if (ans != "break")
            print("Correct! Answers: ${v[rc+2]}")
        else
            print("Answers: ${v[rc+2]}")
        delete (v[rc], v[rc+1], v[rc+2])
    }
    return
}
function sort(vl){  //verb list
    vl = vl.split(chr(9))
    delete vl[len(vl)-1]
    return vl
}

function sortn(nl){ //sort nouns verb list
    nl = nl.split(chr(9))
    delete n1[len(n1)-1] //noun list
    rl = "" //real list
    for (i in range(len(nl)))
        if (i % 4 != 1)
            rl += nl[i] + chr(9)
        else
            rl += nl[i] + ", "  
    return rl.split(chr(9)) //removing final ", "/"chr(9)" item
}


function choices(){
    choices = input("Input here, sep by ',': ").lower().split(",")
    validchoicesnouns = ["nouns1","nouns2","nouns3","nouns4","nouns5"]
    validchoicesnotnouns = ["verbs1","verbs2","verbs3","verbs4","verbsirreg","deponent","adj212","adj33","comparative","adverbs","pronouns","prepositions","conjunctions","misc","numerals"]
    text = t.text()
    fl =  [] //final list
    for (i in range(len(choices)))
        if (choices[i] in validchoicesnotnouns)
            fl += sort(text.split(choices[i])[1])
        else if (choices[i] in validchoicesnouns)
            fl += sortn(text.split(choices[i])[1])

    return fl
}

function mainfull(){
    while (True)
        print("#Welcome to LVT")
        print()
        print("#Choose what you want to quiz on: ")
        print("nouns1/2/3/4")
        print("verbs1/2/3/4/irreg/deponent")
        print("adj212/33/comparative")
        print("adverbs")
        print("pronouns")
        print("prepositions")
        print("conjunctions")
        print("misc")
        print("numerals")
        print()
        print("You can skip the question by inputting 'break' and exit to menu by inputting 'gohome'")
        print()
        m(choices())
}

mainfull()