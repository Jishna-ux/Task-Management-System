import {useEffect} from 'react';
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import {loadMe} from './features/auth/authSlice';
import Protected from './components/Protected';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import TaskDetail from './pages/TaskDetail';
import CreateTask from './pages/CreateTask';
import EditTask from './pages/EditTask';
import Users from './pages/Users';
import Profile from './pages/Profile';
import {CircleHelp,ArrowLeft} from 'lucide-react';

function Boot(){
    const dispatch=useDispatch(),
    token=useSelector(s=>s.auth.token);
    useEffect(()=>{
        if(token)dispatch(loadMe())
    },[]);
return <Routes><Route path="/login" element={<Login/>}/><Route element={<Protected/>}><Route element={<Layout/>}><Route index element={<Dashboard/>}/><Route path="tasks" element={<Tasks/>}/><Route path="tasks/:id" element={<TaskDetail/>}/><Route path="profile" element={<Profile/>}/><Route element={<Protected admin/>}><Route path="tasks/:id/edit" element={<EditTask/>}/><Route path="create-task" element={<CreateTask/>}/><Route path="users" element={<Users/>}/></Route></Route></Route><Route path="*" element={<div className="not-found"><CircleHelp size={34}/><h1>Page not found</h1><p>This page may have moved or doesn't exist.</p><button className="button primary" onClick={()=>location.href='/'}><ArrowLeft size={16}/>Back to workspace</button></div>}/></Routes>}
export default function App(){
    return <BrowserRouter><Boot/></BrowserRouter>
}
