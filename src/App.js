import './App.css';
import './App.scss';
import { useState, useEffect, useRef } from 'react';
import Messages from "./Messages";
import Input from "./Input";
import Nickname from "./Nickname";

function App() {
  const scrollRef = useRef(null);

  const [classNamesLeft, setClassNamesLeft] = useState('split left');
  const [classNamesRight, setClassNamesRight] = useState('split right');
  const [classNamesFrame, setClassNamesFrame] = useState('');
  const [classNamesContent, setClassNamesContent] = useState('hiddenByDefault');
  const [classNamesInput, setClassNamesInput] = useState('hiddenByDefault');
  const [nickname, setNickname] = useState('');

  const scrollToBottom = () => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }


  const childRef = useRef();
  useEffect(() => {
    let nickname = sessionStorage.getItem("nickname");
    if (!nickname) {
      childRef.current.openDialog();
    } else {
      setClassNamesLeft('split left animationLeft');
      setClassNamesRight('split right animationRight');
      setClassNamesFrame('animationBorder');
      setClassNamesContent('animationContent');
      setClassNamesInput('animationContent');
      document.body.classList.add('animationBackground');
    }
  }, []);

  const handleChangeNickname = (event) => {
    sessionStorage.setItem("nickname", event);
    setNickname(event);
  };

  const handleChangeNicknameSave = () => {
    setClassNamesLeft('animationLeft');
    setClassNamesRight('animationRight');
    setClassNamesFrame('animationBorder')
    setClassNamesContent('animationContent')
    setClassNamesInput('animationContent')
    document.body.classList.add('animationBackground');
  };

  return (
    <div>

      <div className={`split left ${classNamesLeft}`}></div>
      <div className={`split right ${classNamesRight}`}></div>

      <div className={`App ${classNamesFrame}`}>
        <Nickname
          ref={childRef}
          onNickname={handleChangeNickname}
          onNicknameSave={handleChangeNicknameSave}
          nickname={nickname}
        />
        <Messages
          messages={null}
          currentMember={'test'}
          classNamesContent={classNamesContent}
          scrollRef={scrollRef}
          scrollToBottom={scrollToBottom}

        />
        <Input
          classNamesInput={classNamesInput}
          scrollToBottom={scrollToBottom}
          nickname={nickname}
        />
      </div>
    </div>
  );
}

export default App;