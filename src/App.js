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
const Blogs = lazy(() => import('./page/routes/blogs'))
const BlogCreate = lazy(() => import('./page/routes/blog_create'))
const BlogView = lazy(() => import('./page/routes/blog_view'))



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

            <Protected path="/blogs" exact><Blogs/></Protected>
            <Protected path="/blog/create" exact><BlogCreate/></Protected>
            <Route path="/blog/:id" exact><BlogView/></Route>

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
