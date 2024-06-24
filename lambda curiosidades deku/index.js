/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');
const i18n = require('i18next');
const sprintf = require('i18next-sprintf-postprocessor');

const data = {
  en: [
    'Izuku Midoriya, known as Deku, has been a great admirer of All Might since he was a child.',
    'Deku was born without a Quirk, something very rare in his world, but he never stopped dreaming of becoming a hero.',
    'His persistence impressed All Might, who decided to pass on his Quirk, One For All, to him."',
    'Deku is an obsessive student of heroes and has notebooks full of notes about them.',
    'The nickname "Deku" was initially a mockery, but Ochaco Uraraka gave it a new positive meaning.',
    'Throughout his training, Deku has suffered numerous injuries, especially to his arms."',
    'Katsuki Bakugo, his childhood friend, used to bully him, but their relationship evolved into an intense rivalry.',
    'Deku is known for his incredible work ethic and determination to push his limits.',
    'His first hero costume was designed by himself and his mother, and it has been improved several times.',
    
  ],
  es: [
    'Izuku Midoriya, conocido como Deku, es un gran admirador de All Might desde que era un niño.',
    'Deku nació sin un Quirk, algo muy raro en su mundo, pero nunca dejó de soñar con convertirse en un héroe.',
    'Su persistencia impresionó a All Might, quien decidió transmitirle su Quirk, One For All.',
    'Deku es un estudioso obsesivo de los héroes y tiene cuadernos llenos de notas sobre ellos.',
    'El apodo "Deku" inicialmente era una burla, pero Ochaco Uraraka le dio un nuevo significado positivo.',
    'A lo largo de su entrenamiento, Deku ha sufrido numerosas heridas, especialmente en sus brazos.',
    'Katsuki Bakugo, su amigo de la infancia, solía intimidarlo, pero su relación evolucionó a una competencia intensa.',
    'Deku es conocido por su increíble ética de trabajo y su determinación para superar sus límites.',
    'Su primer traje de héroe fue diseñado por él mismo y su madre, y ha sido mejorado varias veces.'
  ]
};

const languageStrings = {  
en: {
    translation: {
      GET_FRASES_MSG: 'A fun fact about Deku is that...',
    GET_FRASES_MSGSalida: '... you can ask for another fun fact... say "give me curiosities about Deku"... or if you want me to stop just say, "Cancel!"... so... how can I help you?',
    WELCOME_MESSAGE: 'Welcome to Dekus fun facts, you can say Hello or Help. Which do you prefer?',
    HELLO_MESSAGE: 'Hello to Dekus fun facts!',
    HELP_MESSAGE: 'You can say hello to me. How can I help you?',
    GOODBYE_MESSAGE: 'Goodbye!',
    REFLECTOR_MESSAGE: 'You just activated %s',
    FALLBACK_MESSAGE: 'Sorry, I dont know about that. Please try again, friend.',
    ERROR_MESSAGE: 'Sorry, there was a problem. Please try again, brother.'
      
    }
},

es: {
    translation: {
      GET_FRASES_MSG: 'Un dato curioso de deku es que...',
      GET_FRASES_MSGSalida: '... puedes pedir otro dato curioso... di "dime curiosidades de Deku" ... o si deseas detenerme solo di, ¡Cancela! ... entonces ... ¿cómo te puedo ayudar?',
      WELCOME_MESSAGE: 'Bienvenido a curiosidades de Deku, puedes decir Hola o Ayuda. Cual prefieres?',
      HELLO_MESSAGE: 'Hola a curisoidades de Deku!',
      HELP_MESSAGE: 'Puedes decirme hola. Cómo te puedo ayudar?',
      GOODBYE_MESSAGE: 'Adiós!',
      REFLECTOR_MESSAGE: 'Acabas de activar %s',
      FALLBACK_MESSAGE: 'Lo siento, no se nada sobre eso. Por favor inténtalo otra vez carnal.',
      ERROR_MESSAGE: 'Lo siento, ha habido un problema. Por favor inténtalo otra vez hermano.'
    }
}
}


const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('WELCOME_MESSAGE');
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const CuriosidadesIntentHandler = {
 canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CuriosidadesIntent';
  },
  handle(handlerInput) {
    const locale = handlerInput.requestEnvelope.request.locale;
    const language = locale.substring(0, 2);
    const frasesArray = data[language] || data['en'];  // default to English if the language is not supported
    const frasesIndice = Math.floor(Math.random() * frasesArray.length);
    const randomFrase = frasesArray[frasesIndice];
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    const PrimerMsg = requestAttributes.t('GET_FRASES_MSG');
    const MsgSalida = requestAttributes.t('GET_FRASES_MSGSalida');
    const speakOutput = `${PrimerMsg} ${randomFrase}${MsgSalida}`;

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .getResponse();
  }
};
const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('HELLO_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('HELP_MESSAGE');
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('GOODBYE_MESSAGE');
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('FALLBACK_MESSAGE');
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
         const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t(`REFLECTOR_MESSAGE ${intentName}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('ERROR_MESSAGE');
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const LoggingRequestInterceptor = {
    process(handlerInput) {
        console.log(`Incoming request: ${JSON.stringify(handlerInput.requestEnvelope.request)}`);
    }
};

// This response interceptor will log all outgoing responses of this lambda
const LoggingResponseInterceptor = {
    process(handlerInput, response) {
      console.log(`Outgoing response: ${JSON.stringify(response)}`);
    }
};

// This request interceptor will bind a translation function 't' to the requestAttributes.
const LocalizationInterceptor = {
  process(handlerInput) {
    const localizationClient = i18n.use(sprintf).init({
      lng: handlerInput.requestEnvelope.request.locale,
      fallbackLng: 'en',
      overloadTranslationOptionHandler: sprintf.overloadTranslationOptionHandler,
      resources: languageStrings,
      returnObjects: true
    });

    const attributes = handlerInput.attributesManager.getRequestAttributes();
    attributes.t = function (...args) {
      return localizationClient.t(...args);
    }
  }
}
/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        CuriosidadesIntentHandler,
        HelloWorldIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
        .addRequestInterceptors(
        LocalizationInterceptor,
        LoggingRequestInterceptor)
    .addResponseInterceptors(
        LoggingResponseInterceptor)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();