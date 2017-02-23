import React from 'react'
import { render } from 'react-dom'
import sw from "file-loader!./sw";
import fetch from 'isomorphic-fetch'

// UI
import Window from './component/UI/Window';
import View, { SubView, Item } from './component/UI/View';
import Bar, { BarGroup, BarItem, BarBtnItem } from './component/UI/Bar';
import Presentation, { PresentationItem } from './component/UI/Presentation';
import ProgressBar from './component/UI/ProgressBar';
import Searchbar from './component/UI/Searchbar';
import ScrollView from './component/UI/ScrollView';
import BtnItem from './component/UI/BtnItem';

// Element
import Label from './component/Element/Label';
import Ico from './component/Element/Ico';

// router
import { Router, Switch, Route } from 'react-router'
import createHistory from 'history/createBrowserHistory'
const history = createHistory()

//////////////////////////////////////////////////

const toJson = (res) => res.json();
const toText = (res) => res.text();
const check = (res) => {
  if (!res.ok) throw Error()
  return res
};

class Root extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      loadStatus: 0,
      items: []
    }
  }

  componentDidMount() {
  }

  submit(text) {
    this.setState({ loadStatus: 1 })
    fetch(`
      https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyC3VBRnfUU9_qO1Gr1ARBO8BZLT-Sp6vFc&maxResults=50&q=${text}
    `)
    .then(check)
    .then(toJson)
    .then((res) => {
      this.setState({
        loadStatus: 2,
        items: res.items
      })
    })
  }

  render() {
    return (
      <Window>

        <View>

          <Item>
            <ProgressBar status={this.state.loadStatus} />
            <Searchbar submitValue={this.submit.bind(this)} />
          </Item>

          <ScrollView>
            <div className="container">
              <div className="row -gt">
              {
                this.state.items.map((v,i) => {
                  const thumbnailurl = v.snippet.thumbnails.default.url
                  const title = v.snippet.title
                  return (
                    <div key={i} className="col-3">
                      <img src={thumbnailurl} width="100%" />
                    </div>
                  )
                })
              }
              </div>
            </div>
          </ScrollView>

          <Bar mod="-bd-top bg-color-white">
            <BarGroup mod="-grid-12">
              <BarBtnItem mod="-dir-col">
                <Ico color="magenta" size="3" id="youtube_searched_for" />
                <Label mod="t-size-1 color-magenta">search</Label>
              </BarBtnItem>
            </BarGroup>
          </Bar>

        </View>

      </Window>
    )
  }
}

render(
  <Root />,
  document.getElementById('app')
)

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./js/' + sw).then(function(reg){
    console.log("Yes it did.");
  }).catch(function(err) {
    console.log("No it didn't. This happened: ", err)
  });
}

/*
 *
      <Window>

        <View mod="-lv1 -fix-top"><ProgressBar status={this.state.loadStatus} /></View>

        <View>

          <ScrollView onClick={this.click.bind(this)}>
            <div>
            {
              this.state.items.map((v,i) => {
                const thumbnailurl = v.snippet.thumbnails.default.url
                const title = v.snippet.title
                return (
                  <div key={i} className="row -wrap-no">
                    <div className="col">
                      <img src={thumbnailurl} width="64" />
                    </div>
                    <div className="col -grow">{title}</div>
                  </div>
                )
              })
            }
            </div>
          </ScrollView>

          <Bar mod="-bd-top bg-color-white">
            <BarGroup mod="-grid-3">
              <BarBtnItem mod="-dir-col">
                <Ico color="magenta" size="3" id="account_circle" />
                <Label mod="t-size-1 color-magenta">account</Label>
              </BarBtnItem>
            </BarGroup>
            <BarGroup mod="-grid-3">
              <BarBtnItem  mod="-dir-col">
                <Ico color="magenta" size="3" id="room" />
                <Label mod="t-size-1 color-magenta">room</Label>
              </BarBtnItem>
            </BarGroup>
            <BarGroup mod="-grid-3">
              <BarBtnItem mod="-dir-col">
                <Ico color="magenta" size="3" id="face" />
                <Label mod="t-size-1 color-magenta">face</Label>
              </BarBtnItem>
            </BarGroup>
            <BarGroup mod="-grid-3">
              <BarBtnItem mod="-dir-col">
                <Ico color="magenta" size="3" id="add" />
                <Label mod="t-size-1 color-magenta">add</Label>
              </BarBtnItem>
            </BarGroup>

          </Bar>

        </View>

      </Window>
*/
