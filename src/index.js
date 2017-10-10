// 引用各个模块
import { Route, Redirect, Switch, Prompt, withRouter } from 'react-router'
import { Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import model from './model'
import { actions } from './actions'
import render from './render'
import hook from './hook'
import Router from './router'
import defaults from './defaults'

// 暴露接口
export default {
  model,
  actions,
  hook,
  defaults,
  connect,
  render,

  Router,
  Route,
  Link,
  NavLink,
  Switch,
  Redirect,
  Prompt,
  withRouter
}

export {
  model,
  actions,
  hook,
  defaults,
  connect,
  render,

  Router,
  Route,
  Link,
  NavLink,
  Switch,
  Redirect,
  Prompt,
  withRouter
}
