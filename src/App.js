import React, {Suspense, lazy} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Helmet } from "react-helmet";
import {AuthProvider} from './context/LoginContext'
import Spinner from './components/animate/spinner'
import Screen from './page/screen'
import Header from './page/header'
import Sidebar from './page/sidebar'
import Body from './page/body'
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
const BlogView = lazy(() => import('./page/routes/blog_view/index'))

// info

const Info = lazy(() => import('./page/routes/info_life/index'))

// My

const Favorite = lazy(() => import('./page/routes/favorite'))
const ThumbUp = lazy(() => import('./page/routes/thumbups'))



// tools
const Drug = lazy(() => import('./page/routes/measure_drug/index'))
const Glass = lazy(() => import('./page/routes/measure_glass'))
const Flow = lazy(() => import('./page/routes/measure_flow'))
const Salt = lazy(() => import('./page/routes/measure_salt'))

// add
const AddTest = lazy(() => import('./page/routes/add_test'))
const AddLivestock = lazy(() => import('./page/routes/add_livestock'))
const AddEquipment = lazy(() => import('./page/routes/add_equipment'))

// report 
const TapWater = lazy(() => import('./page/routes/report_water'))



// personal
const PersonTitle = lazy(() => import('./page/routes/mytitle'))
const PersonTask = lazy(() => import('./page/routes/mytask'))
const Friends = lazy(() => import('./page/routes/communication/index'))
const PersonMsg = lazy(() => import('./page/routes/mymsg'))
const PersonAt = lazy(() => import('./page/routes/myat'))
const PersonalDetails = lazy(() => import('./page/routes/myinfo'))
const ResetPass = lazy(() => import('./page/routes/resetpassword'))
const Certification = lazy(() => import('./page/routes/certification'))
const Privacy = lazy(() => import('./page/routes/privacy'))
const ClearCache = lazy(() => import('./page/routes/clearcache'))


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
            <Route path="/" exact><Body><Home/></Body></Route>
            <Route path="/login" exact><Body><Login/></Body></Route>

            <Route path="/dose" exact><Body><Drug/></Body></Route>
            <Route path="/glass" exact><Body><Glass/></Body></Route>
            <Route path="/flow" exact><Body><Flow/></Body></Route>
            <Route path="/salt" exact><Body><Salt/></Body></Route>

            <Protected path="/tanks" exact><Body><Tanks/></Body></Protected>
            <Protected path="/tank/create" exact><Body><TankCreate/></Body></Protected>
            <Route path="/tank/:id" exact><Body><TankView/></Body></Route>

            <Protected path="/blogs" exact><Body><Blogs/></Body></Protected>
            <Protected path="/blog/create" exact><Body><BlogCreate/></Body></Protected>
            <Route path="/blog/:id" exact><Body><BlogView/></Body></Route>

            <Protected path="/add/test/:id"><Body><AddTest/></Body></Protected>
            <Protected path="/add/test/"><Body><AddTest/></Body></Protected>
            <Protected path="/add/livestock/:id"><Body><AddLivestock/></Body></Protected>
            <Protected path="/add/livestock/"><Body><AddLivestock/></Body></Protected>
            <Protected path="/add/equipment/:id"><Body><AddEquipment/></Body></Protected>
            <Protected path="/add/equipment/"><Body><AddEquipment/></Body></Protected>

            <Protected path="/favorites/"><Body><Favorite /></Body></Protected>
            <Protected path="/thumbups/"><Body><ThumbUp /></Body></Protected>

            <Route path="/info/:cate" exact><Body><Info/></Body></Route>
            <Route path="/info/:cate/:world" exact><Body><Info/></Body></Route>
            <Route path="/info/:cate/:world/:classId" exact><Body><Info/></Body></Route>
            <Route path="/info/:cate/:world/:classId/:id" exact><Body><Info/></Body></Route>

            <Route path="/tapwater" exact><Body><TapWater/></Body></Route>

            
            <Protected path="/mytitle" exact><Body><PersonTitle/></Body></Protected>
            <Route path="/title/:id" exact><Body><PersonTitle/></Body></Route>
            <Protected path="/mytask" exact><Body><PersonTask/></Body></Protected>
            
            <Protected path="/friends" exact><Friends/></Protected>
            <Protected path="/messages" exact><PersonMsg/></Protected>
            <Protected path="/atlist" exact><PersonAt/></Protected>

            <Protected path="/resetpassword" exact><Body><ResetPass/></Body></Protected>
            <Protected path="/certification" exact><Body><Certification/></Body></Protected>
            <Protected path="/privacy" exact><Body><Privacy/></Body></Protected>
            <Protected path="/clearcache" exact><Body><ClearCache/></Body></Protected>

            <Protected path="/mydetails" exact><Body><PersonalDetails/></Body></Protected>

            <Route path="*"><Body><NotFound/></Body></Route>
          </Switch> 
        </Suspense>
      </Router>
    </AuthProvider>
  )
}
