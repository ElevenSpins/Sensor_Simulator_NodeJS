/*
888888 88     888888 Yb    dP 888888 88b 88 .dP"Y8 88""Yb 88 88b 88 .dP"Y8
88__   88     88__    Yb  dP  88__   88Yb88 `Ybo." 88__dP 88 88Yb88 `Ybo."
88""   88  .o 88""     YbdP   88""   88 Y88 o.`Y8b 88"""  88 88 Y88 o.`Y8b
888888 88ood8 888888    YP    888888 88  Y8 8bodP' 88     88 88  Y8 8bodP'
*/

/*
*----------------------------------------------------*
|                   Build by Marian                  |
|                       2021                         |
|              SENSOR SIMULATOR OVER MQTT            |
*----------------------------------------------------*
*/


const moment = require('moment')

moment.locale('de-de')

const mqtt = require('mqtt')


const connectoptions = {
    cmd: 'connect',
    protocolId: 'MQTT', // Or 'MQIsdp' in MQTT 3.1 and 5.0
    protocolVersion: 4, // Or 3 in MQTT 3.1, or 5 in MQTT 5.0
    clientId: 'Simulator',
    clean: true,
/*  username: 'hamster',
    password: 'NSfjIsxvgzctFNyB.PQ.qQ7OOLedhXS',*/
    keepalive: 10, // Seconds which can be any positive number, with 0 as the default setting
    port: 1883,
    will:
        {
            topic: 'your/crazy/Topic/',
            payload: new Buffer('offline'), // Payloads are buffers
        },
}


var client = mqtt.connect("mqtt://test.mosquitto.org", connectoptions)

const homeTopic = 'your/crazy/'
const anlage = 'topic/'


setInterval(() => {

    const topicTemp = homeTopic + anlage + 'Temperatur'
    const topicLuft = homeTopic + anlage + 'Luftfeuchtigkeit'


    client.subscribe(topicTemp)
    client.subscribe(topicLuft)


    const temp = {
        value: getRandomArbitrary(20, 22).toPrecision(3),
        unit: 'C',
        recordingdate: moment(new Date()),
    }

    const luft = {
        value: getRandomArbitrary(47, 60).toPrecision(3),
        unit: 'g/m3',
        recordingdate: moment(new Date()),
    }


    client.publish(topicTemp, JSON.stringify(temp, null, 0), { qos: 0, retain: false, dup: false })
    client.publish(topicLuft, JSON.stringify(luft, null, 0), { qos: 0, retain: false, dup: false })
}, 3000)

setInterval

client.on('connect', () => {
    console.log('connected')
})


client.on('error', () => {
    console.log('error')
})

client.on('reconnect', () => {
    console.log('reconnect')
})


client.on('close', () => {
    console.log('close')
})

client.on('offline', () => {
    console.log('offline')
})


const onMessage = (topic, message) => {
    console.log('TOPIC: ' + topic.toString() + ' MESSAGE: ' + message.toString())
    // client.end()
}
client.on('message', onMessage)

const getDate = () => {
    const ts_hms = new Date()
    return ts_hms.getFullYear() + '-'
        + ('0' + (ts_hms.getMonth() + 1)).slice(-2) + '-'
        + ('0' + (ts_hms.getDay() + 1)).slice(-2) + ' '
        + ('0' + ts_hms.getHours()).slice(-2) + ':'
        + ('0' + ts_hms.getMinutes()).slice(-2) + ':'
        + ('0' + ts_hms.getSeconds()).slice(-2)
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min
}
