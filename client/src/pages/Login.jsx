import {useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {signIn} from '../features/auth/authSlice';
import {Navigate} from 'react-router-dom';
import {CheckSquare,ArrowRight,ShieldCheck} from 'lucide-react';
export default function Login(){
    const [email,setEmail]=useState(''),[password,setPassword]=useState('');
    const dispatch=useDispatch();
    const {user,error,loading}=useSelector(s=>s.auth);
    if(user)return <Navigate to="/" replace/>;
    const submit=e=>{e.preventDefault();
        dispatch(signIn({email,password}));
    };
    return <main className="login-page"><section className="login-side"><div className="brand light"><span className="brand-mark"><CheckSquare size={19}/></span>taskflow</div><div className="login-message"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="login-symbol"><CheckSquare size={33}/></div><h1>Make space for<br/><em>great work.</em></h1><p>Bring your team's tasks, people, and progress together in one thoughtful workspace.</p><div className="login-proof"><ShieldCheck size={17}/> Your work stays yours. Secure by design.</div></div><div className="login-side-footer">A calmer way to get things done.</div></section><section className="login-form-side"><div className="login-form-wrap"><div className="welcome-mark"><CheckSquare size={20}/></div><h2>Welcome back</h2><p className="muted">Sign in to continue to your workspace.</p><form onSubmit={submit} className="form-stack"><label>Email address<input type="email" autoComplete="username" placeholder="you@company.com" value={email} onChange={e=>setEmail(e.target.value)} required/></label><label>Password<input type="password" autoComplete="current-password" placeholder="Enter your password" value={password} onChange={e=>setPassword(e.target.value)} required minLength={8}/></label>{error&&<div className="error-box">{error}</div>}<button className="button primary full" disabled={loading}>{loading?'Signing in…':'Sign in'}<ArrowRight size={17}/></button></form><div className="login-footnote">New to the workspace? Ask your administrator for an account.</div></div><span className="copyright">© 2026 Taskflow · Built for teams that care about the details</span></section></main>}
