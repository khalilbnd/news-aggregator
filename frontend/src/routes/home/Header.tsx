/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from 'react-redux';
import './style.css';
import { FaSun } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";
import { RootState } from '../../redux/store';

export default function Header({changeText}: any) {
    const dispatch = useDispatch();
    const theme = useSelector((state: RootState) => state.settingReducer.theme);
    return (
        <header className="header">
            <div className="logo">
                <h1 style={{color: theme == 'light' ? 'black' : 'white'}}>My Website</h1>
            </div>
            <div className="search-bar">
                <input type="text" placeholder="Search..." style={{backgroundColor: theme == 'light' ? 'white' : 'black', color: theme == 'light' ? 'black' : 'white'}} onChange={(e)=> changeText(e.target.value)}/>
            </div>

            <div className="theme-switcher" onClick={()=> theme == 'light' ? dispatch({type: 'SET_THEME', payload: 'dark'}) : dispatch({type: 'SET_THEME', payload: 'light'})}>
                {
                    theme == 'light' ? <FaMoon size={30} color='gray'/> : <FaSun size={30} color='gray'/>
                }
            </div>
            
        </header>
    );
}
