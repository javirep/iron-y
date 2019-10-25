const mongoose = require('mongoose');
const SocialChallenge = require('../models/SocialChallenge');


mongoose.connect('mongodb://localhost/iron-y', { useNewUrlParser: true, useUnifiedTopology: true });
SocialChallenge.collection.drop();

const socialChallenges = [
    {
        name: "IronPong",
        description: "Tu oportunidad para destacar otras habilidades! si eres de los buenos ven a ganar! si eres de los malos haznos un favor y no faltes hecharnos unas risas es lo que queremos todos, te esperamos. IronPong para los que no lo pillen, es un merge entre Ironhack y ping pong. ¿Que significa? Facil! Organizamos un torneo de ping pong con todo ironhacker que tenga ganas de compartir un rato con otros Ironhackers.",
        modify: "hp",
        difficulty: "easy", 
    },
    {
        name: "conncetPeople",
        description: "Este nuevo challenge consiste en acercarte y conocer 5 ironhackers desconocidos hasta el momento. Acercate y comparte! Si quieres ligar, pide numeros de telefono! pero no asustes a nadie por favor! Y sobretodo disfruta y sientate como en casa.",
        modify: "both",
        difficulty: "medium",  
    },
    {
        name: "justDance",
        description: "Llega el viernes, y con él tu oportunidad de retar tus compañeros a duelos de topDances. Participa y no te quedes apalancado en las gradas! Conectaremos el juego..",
        modify: "hp",
        difficulty: "easy", 
    }
]

SocialChallenge.create(socialChallenges, (err) => {
    if (err) {throw(err)}
    console.log(`Created ${socialChallenges.length} socialchallenges`)
})