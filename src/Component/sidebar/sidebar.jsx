import {React, useState} from 'react'
import './sidebar.css';
import {assets} from '../../assets/assets';
import { useContext } from 'react';
import { context } from '../../context/context';

const sidebar = () => {

    const [extender, setExtender] = useState(false);
    const {onSent, previousPrompts, setRecentPrompt, newChat} = useContext(context)

    const loadPrompt = async(prompt) => {
        setRecentPrompt(prompt)
        await onSent(prompt)
    }

  return (
    <div className='sidebar'>
        <div className="top">
            <img onClick={() => setExtender(prev => !prev)} className='menu' src={assets.menu_icon} alt="" />
            <div onClick={() => newChat()} className="new-chat">
                <img src={assets.plus_icon} alt="" />
                {extender ? <p>New Chat</p> : null}
            </div>
            {extender ? 
            <div className="recent">
                <p className="recent-title">Recent</p>
                {previousPrompts.map((item, index) => {
                    return (
                        <div onClick={() => loadPrompt(item)} key={index} className="recent-entry">
                            <img src={assets.message_icon} alt="" />
                            <p>{item.slice(0,18)}...</p>
                        </div>
                    )
                })}
                
            </div>
            : null}
        </div>
        <div className="bottom">
            <div className="bottom-item recent-entry">
                <img src={assets.question_icon} alt="" />
                {extender ? <p>Help</p> : null}
            </div>
            <div className="bottom-item recent-entry">
                <img src={assets.history_icon} alt="" />
                {extender ? <p>Activity</p> : null}
            </div>
            <div className="bottom-item recent-entry">
                <img src={assets.setting_icon} alt="" />
                {extender ? <p>settings</p> : null}
            </div>
        </div>
    </div>
  )
}

export default sidebar