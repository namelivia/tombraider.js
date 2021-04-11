import Api from './Api'

describe('Api', () => {
  test('Test executing alert action', () => {
    let alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {})
    const api = new Api()
    api.execute('alert', 'this is a test alert')
    expect(alertMock).toHaveBeenCalledWith('this is a test alert')
  })

  test('Test executing link action', () => {
    let navigateMock = jest.fn()
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { assign: navigateMock },
    })
    const api = new Api()
    api.execute('link', 'http://test.com')
    expect(navigateMock).toHaveBeenCalledWith('http://test.com')
  })
})
