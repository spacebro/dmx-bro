'use strict'

const standardSettings = require('standard-settings')
const settings = standardSettings.getSettings()

const DMX = require('dmx')
const { SpacebroClient } = require('spacebro-client')

const client = new SpacebroClient({ ...settings.spacebro })

const dmx = new DMX()

for (const universe in settings.dmx.universes) {
  console.log(`Adding universe "${universe}".`)
  dmx.addUniverse(
    universe,
    settings.dmx.universes[universe].output.driver,
    settings.dmx.universes[universe].output.device,
    settings.dmx.universes[universe].output.options
  )
}

client.on('blackout', (datas) => {
  for (const universe in settings.dmx.universes) {
    dmx.updateAll(universe, 0)
  }
})

settings.events.forEach((event) => {
  client.on(event.name, (datas) => {
    const universe = datas.universe || event.universe || "default"
    const values = datas.values || event.values || {}
    const delay = datas.delay || event.delay || 0

    console.log(`sending "${event.name}" to ${universe}`)
    if (delay) console.log(`waiting ${delay}s...`)

    setTimeout(() => {
      dmx.update(universe, values)
    }, (delay * 1000))
  })
})
