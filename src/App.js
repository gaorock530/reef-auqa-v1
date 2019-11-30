import React, {Suspense, lazy} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Screen from './page/screen'
import Header from './page/header'
import Sidebar from './page/sidebar'
import Fallback from './page/fallback'
import Protected from './page/protected'

const NotFound =lazy(() => import('./page/notfound'))
const Home = lazy(() => import('./page/home'))
const Person = lazy(() => import('./page/person'))
const Login = lazy(() => import('./page/login'))

const PersonalDetails = lazy(() => import('./page/routes/personal'))

const page = "ReefAqua"

class App extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      sideBar: false,
      personBar: false,
      login: localStorage.getItem('id'),
      username: null
    }
    
  }

  componentDidMount () {
    console.log('start')
    
    // if (!this.state.login) {
    //   // setTimeout(() => {this.setState({login: true})}, 5000)
    //   // localStorage.setItem('id', true)
    // }
    // const login = localStorage.getItem('id')
    // if (login) this.setState({login: true})

  }

  componentDidUpdate() {
    console.log('update')
  }

  onLogin = (user) => {
    console.log(user)
    this.setState({login: true, username: user.name.v})
  }

  onLogout = () => {
    this.setState({login: false, username: null})
  }

  render () {
    const {login} = this.state

    return (
      <>
        <Router>
          <Header login={this.state.login} onShowBar={() => this.setState({sideBar: true})} onShowPerson={() => this.setState({personBar: true})}/>
          <Sidebar show={this.state.sideBar} onHideBar={() => this.setState({sideBar: false})} />
          <Screen show={this.state.sideBar || this.state.personBar} onHideBar={() => this.setState({sideBar: false, personBar: false})}/>
          {this.state.login && <Person user={this.state.username} show={this.state.personBar} onHideBar={() => this.setState({personBar: false})} onLogout={this.onLogout}/>}
          <Suspense fallback={<Fallback/>}>
            <Switch>
              <Route path="/" exact><Home page={page}/></Route>
              <Route path="/login" exact><Login login={login} onLogin={this.onLogin} page={page}/></Route>

              <Protected login={login} path="/mydetails" exact><PersonalDetails page={page}/></Protected>

              <Route path="*"><NotFound page={page}/></Route>
            </Switch> 
          </Suspense>
        </Router>
      </>
    )
  }


  
}

export default App;
