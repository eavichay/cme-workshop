const showroom = require('showroom/puppeteer')()
const assert = require('assert')


describe('my-component', () => {
  before( async () => {
    await showroom.start()
  })

  after( async () => {
    await showroom.stop()
  })

  beforeEach( async () => {
    await showroom.setTestSubject('my-component')
  })

  it('Should update message', async () => {
    await showroom.setAttribute('message', 'New Message')
    const innerSpan = await showroom.find('// span')
    const text = await showroom.getTextContent(innerSpan)
    assert.equal(text, 'New Message')
  })

  it('Should dispatch event when message is updated', async () => {
    await showroom.setAttribute('message', 'New Message')
    const events = await showroom.getEventList()
    assert.equal(events.length, 1)
    assert.equal(events[0].type, 'message-changed')
  })
})