import React, { useEffect, useState, useRef } from 'react';
import ReactQuill,{Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Editor = () => {
  const [value, setValue] = useState('');
  const [cursorPosition, setCursorPosition] = useState(0);
  const [codeEditor, setCodeEditor] = useState('');
  const [markupEditor, setMarkupEditor] = useState(false);

  const modules = {
    toolbar: { container: '#toolbar' },
  };

  const editorRef = useRef()


  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image',
    'color', 'background',
    'align',
    'script',
    'header',
  ];


  const changeCodeEditor = () => {
    setValue(codeEditor)
  }

  const changeVisualEditor = (data) => {
    setCodeEditor(value)
  }


  const insertText = (quillRef) => () => {
    var quill = new Quill('#editor-container .ql-container', {});
    quill.insertText(cursorPosition.index, 'Hello', 'bold', true);
    quill.insertEmbed(cursorPosition.index, 'image', 'https://i.pinimg.com/236x/30/91/26/309126bc97a8f52549f12b255d294e7b.jpg');
  }

 

  console.log("currentIndex");
  console.log(cursorPosition);

  return (
    <div className='myEditor'>
      <CustomToolbar markupEditor={markupEditor} setMarkupEditor={setMarkupEditor} />
      <div style={{ display: markupEditor ? 'none' : 'block' }}	>
        <ReactQuill
          id="editor-container"
          ref={editorRef}
          theme="snow"
          value={value}
          onChange={setValue}
          onBlur={changeVisualEditor}
          modules={modules}
          formats={formats}
          onChangeSelection={(data)=> setCursorPosition(data) }
        />
      </div>
      <div className='codeView' style={{ display: markupEditor ? 'block' : 'none' }}	>
        <textarea onChange={(e) => setCodeEditor(e.target.value)} onBlur={changeCodeEditor} value={codeEditor} style={{
          width: '100%',
          boxSizing: "border-box",
          border: '1px solid #b3aaaa',
          background: '#423e3e',
          color: '#fff',
        }}></textarea>
      </div>

      <button onClick={insertText(editorRef)}>
        Add Text
      </button>
    </div>
  )
}

export default Editor;


const CustomToolbar = (props) => {
  const { markupEditor, setMarkupEditor } = props;
  return (
    <div id="toolbar">
      <select className='ql-header'>
        <option value="0"></option>
        <option value="1"></option>
        <option value="2"></option>
        <option value="3"></option>
        <option value="4"></option>
        <option value="5"></option>
        <option value="6"></option>
      </select>
      <button className="ql-bold" />
      <button className="ql-italic" />
      <button className="ql-underline" />
      <button className="ql-strike" />
      <button className="ql-blockquote" />
      <span className='ql-formats'>
        <button className='ql-list' value="ordered" />
        <button className='ql-list' value="bullet" />
        <button className='ql-indent' value="-1" />
        <button className='ql-indent' value="+1" />
      </span>
      <span className='ql-formats'>
        <button className='ql-link' />
        <button className='ql-image' />
        <button className='ql-video' />
      </span>
      <span className='ql-formats'>
        <select className='ql-color ql-picker ql-color-picker'></select>
        <select className='ql-background ql-picker ql-color-picker'></select>
      </span>
      <span className='ql-formats'>
        <select className='ql-align ql-picker ql-icon-picker'></select>
      </span>
      <div className='ql-formats'>
        <button type="button" className="ql-script" value="sub" />
        <button type="button" className="ql-script" value="super" />
      </div>
      <div className='ql-formats'>
        <button className="raw" type="button" onClick={() => setMarkupEditor(prev => !prev)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-code-slash" viewBox="0 0 16 16">
            <path d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294l4-13zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0zm6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0z" />
          </svg>
        </button>
      </div>
    </div>
  )
}