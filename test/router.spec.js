import React from 'react'
import PropTypes from 'prop-types'
import mirror, { actions, render } from 'index'
import { store } from 'store'
import Router from 'router/Router'

beforeEach(() => {
  jest.resetModules()
})

describe('the enhanced Router', () => {

  let rootContext

  const ContextChecker = (props, context) => {
    rootContext = context
    return null
  }

  ContextChecker.contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object,
      route: PropTypes.object
    })
  }

  afterEach(() => {
    rootContext = undefined
  })


  it('should create history to Router', () => {

    const container = document.createElement('div')

    render(
      <Router>
        <ContextChecker/>
      </Router>,
      container
    )

    expect(rootContext.router.history).toBeDefined()
  })

  it('should add navigation methods of history object to actions.routing', () => {

    const container = document.createElement('div')

    mirror.defaults({
      historyMode: 'hash'
    })

    render(
      <Router>
        <ContextChecker/>
      </Router>,
      container
    )

    expect(actions.routing).toBeDefined()
    expect(actions.routing.push).toBeInstanceOf(Function)
    expect(actions.routing.replace).toBeInstanceOf(Function)
    expect(actions.routing.go).toBeInstanceOf(Function)
    expect(actions.routing.goForward).toBeInstanceOf(Function)
    expect(actions.routing.goBack).toBeInstanceOf(Function)
  })

  it('should change history when call methods in actions.routing', () => {

    const container = document.createElement('div')

    mirror.defaults({
      historyMode: 'memory'
    })

    render(
      <Router>
        <ContextChecker/>
      </Router>,
      container
    )

    expect(rootContext.router.route.match.isExact).toBe(true)

    actions.routing.push('/new')

    expect(rootContext.router.route.match.isExact).toBe(false)
  })

  it('should update store when route change', () => {

    const container = document.createElement('div')

    render(
      <Router>
        <ContextChecker/>
      </Router>,
      container
    )

    const state = store.getState()

    expect(state).toHaveProperty('routing')
    expect(state.routing).toHaveProperty('location.pathname', '/')
  })

  it('should be ok if pass an history object', () => {

    const createHashHistory = require('history/createHashHistory').default
    const _history = createHashHistory()

    const container = document.createElement('div')

    render(
      <Router history={_history}>
        <ContextChecker/>
      </Router>,
      container
    )

    expect(rootContext.router.history).toBe(_history)

    expect(rootContext.router.route.match.isExact).toBe(true)
    actions.routing.push('/new')
    expect(rootContext.router.route.match.isExact).toBe(false)
  })

})
