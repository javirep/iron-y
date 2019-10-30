const mongoose = require('mongoose');
const SocialChallenge = require('../models/SocialChallenge');


mongoose.connect('mongodb://localhost/iron-y', { useNewUrlParser: true, useUnifiedTopology: true });
SocialChallenge.collection.drop();

const socialChallenges = [
    {
        name: "IronBeers",
        description: "Como cada viernes, llega el Ironbeer, esta semana llegan con una sorpresa. No te lo pierdas y aprovecha esos momentos, para conectar con otros Ironhackers. ",
        modify: "hp",
        difficulty: 1,
        image: "https://cdn.pixabay.com/photo/2017/06/24/23/41/beer-2439237_960_720.jpg",
    },
    {
        name: "MeetPeople",
        description: "Este nuevo challenge consiste en acercarte y conocer 5 ironhackers desconocidos hasta el momento. Acercate y comparte! Si quieres ligar, pide numeros de telefono! pero no asustes a nadie por favor! Y sobretodo disfruta y sientete como en casa.",
        modify: "exp",
        difficulty: 3,
        image: "https://cdn.pixabay.com/photo/2018/01/26/09/06/personal-3108155__340.jpg",
    },
    {
        name: "JustDance",
        description: "Llega el viernes, y con él tu oportunidad de retar tus compañeros a duelos de danza con la switch. Participa y no te quedes apalancado en las gradas! Conectaremos el juego..",
        modify: "hp",
        difficulty: 5,
        image: "https://cdn.pixabay.com/photo/2018/09/20/16/49/girl-3691314_960_720.jpg",
    }
]

SocialChallenge.create(socialChallenges, (err) => {
    if (err) { throw (err) }
    console.log(`Created ${socialChallenges.length} socialchallenges`)
})