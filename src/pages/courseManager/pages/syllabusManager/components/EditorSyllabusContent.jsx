import React, { useState, useRef, useEffect } from 'react';
import JoditEditor from 'jodit-react';

const EditorSyllabusContent = ({ placeholder, value, setEditorContents }) => {
	const editor = useRef(null);
	const [content, setContent] = useState(placeholder);

	const config =
	{
		readonly: false, // all options from https://xdsoft.net/jodit/doc/,
		placeholder: placeholder || 'Start typings...',
		disablePlugins: ['print', 'preview', 'fullsize'],
		toolbarButtonSize: "small",
		height: 650
	};

	useEffect(() => {
		setContent(value);
	}, [value])

	const handleContentChange = (editorContent) => {
		setContent(editorContent)
		setEditorContents(editorContent);
	}

	return (
		<>
			<JoditEditor
				ref={editor}
				value={content}
				config={config}
				tabIndex={1} // tabIndex of textarea
				onBlur={newContent => handleContentChange(newContent)} // preferred to use only this option to update the content for performance reasons
				onChange={newContent => { }}
			/>
		</>
	);
};

export default EditorSyllabusContent;