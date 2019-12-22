import React, {Suspense, lazy} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Helmet } from "react-helmet";
import {AuthProvider} from './context/LoginContext'
import Spinner from './components/animate/spinner'
import Screen from './page/screen'
import Header from './page/header'
import Sidebar from './page/sidebar'

import Protected from './page/protected'


// base
const NotFound =lazy(() => import('./page/notfound'))
const Home = lazy(() => import('./page/home'))
const Login = lazy(() => import('./page/login'))
const PersonSideBar = lazy(() => import('./page/personalSidebar'))

// record
const Tanks = lazy(() => import('./page/routes/tanks'))
const TankCreate = lazy(() => import('./page/routes/tank_create'))
const TankView = lazy(() => import('./page/routes/tank_view/index'))

// tools
const Drug = lazy(() => import('./page/routes/measure_drug/index'))
const Glass = lazy(() => import('./page/routes/measure_glass'))
const Flow = lazy(() => import('./page/routes/measure_flow'))
const Salt = lazy(() => import('./page/routes/measure_salt'))

// add
const AddTest = lazy(() => import('./page/routes/add_test'))
const AddLivestock = lazy(() => import('./page/routes/add_livestock'))
const AddEquipment = lazy(() => import('./page/routes/add_equipment'))


// personal
const PersonalDetails = lazy(() => import('./page/routes/personal'))

export default () => {

  return (
    <AuthProvider>
      <Helmet titleTemplate="ReefAqua|%s" defaultTitle="ReefAqua">
        <meta name="description" content="ReefAqua" />
      </Helmet>
      <Router>
        <Header/>
        <Sidebar/>
        <Screen/>
        <PersonSideBar/>
        <Suspense fallback={<Spinner/>}>
            <Switch>
            <Route path="/" exact><Home/></Route>
            <Route path="/login" exact><Login/></Route>
            <Route path="/dose" exact><Drug/></Route>
            <Route path="/glass" exact><Glass/></Route>
            <Route path="/flow" exact><Flow/></Route>
            <Route path="/salt" exact><Salt/></Route>

            <Protected path="/tanks" exact><Tanks/></Protected>
            <Protected path="/tank/create" exact><TankCreate/></Protected>
            <Route path="/tank/:id" exact><TankView/></Route>

            <Protected path="/add/test/:id"><AddTest/></Protected>
            <Protected path="/add/test/"><AddTest/></Protected>
            <Protected path="/add/livestock/:id"><AddLivestock/></Protected>
            <Protected path="/add/livestock/"><AddLivestock/></Protected>
            <Protected path="/add/equipment/:id"><AddEquipment/></Protected>
            <Protected path="/add/equipment/"><AddEquipment/></Protected>
            
            <Protected path="/mydetails" exact><PersonalDetails/></Protected>
            
            <Route path="*"><NotFound/></Route>
          </Switch> 
        </Suspense>
      </Router>
    </AuthProvider>
  )
}

// class App extends React.PureComponent {
//   constructor (props) {
//     super(props)
//     this.state = {
//       sideBar: false,
//       personBar: false,
//     }
    
//   }

//   componentDidMount () {
//     // console.log('start')
//     // process.socket = new WebSocket('ws://localhost:3000')
//     // if (!this.state.login) {
//     //   // setTimeout(() => {this.setState({login: true})}, 5000)
//     //   // localStorage.setItem('id', true)
//     // }
//     // const login = localStorage.getItem('id')
//     // if (login) this.setState({login: true})

//   }

//   componentDidUpdate() {
//     // console.log('update')
//   }

//   onLogin = (user) => {
//     // console.log(user)
//     this.setState({login: true, username: user.name.v})
//   }

//   onLogout = () => {
//     this.setState({login: false, username: null})
//   }

//   render () {
//     const {login, sideBar, personBar, username} = this.state

//     return (
//       <AuthProvider>
//         <Router>
//           <Header onShowBar={() => this.setState({sideBar: true})} onShowPerson={() => this.setState({personBar: true})}/>
//           <Sidebar show={sideBar} onHideBar={() => this.setState({sideBar: false})} />
//           <Screen show={sideBar || personBar} onHideBar={() => this.setState({sideBar: false, personBar: false})}/>
//           {login && <PersonSideBar user={username} show={personBar} onHideBar={() => this.setState({personBar: false})} onLogout={this.onLogout}/>}
//           <Suspense fallback={<Spinner/>}>
//             <Switch>
//               <Route path="/" exact><Home page={page}/></Route>
//               <Route path="/login" exact><Login onLogin={this.onLogin} page={page} login={login}/></Route>
//               <Route path="/dose" exact><Drug page={page}/></Route>
//               <Route path="/glass" exact><Glass page={page}/></Route>
//               <Route path="/flow" exact><Flow page={page}/></Route>
//               <Route path="/salt" exact><Salt page={page}/></Route>

//               <Protected path="/tanks" exact login={login}><Tanks page={page}/></Protected>
//               <Protected path="/tank/create" exact login={login}><TankCreate page={page}/></Protected>
//               <Route path="/tank/:id" exact><TankView page={page} login={login}/></Route>
              
//               <Protected login={login} path="/mydetails" exact><PersonalDetails page={page}/></Protected>
              
//               <Route path="*"><NotFound page={page}/></Route>
//             </Switch> 
//           </Suspense>
//         </Router>
//       </AuthProvider>
//     )
//   }


  
// }

// export default App;
