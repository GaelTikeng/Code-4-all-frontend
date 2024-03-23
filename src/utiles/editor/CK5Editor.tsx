import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Editor } from '@ckeditor/ckeditor5-core';

const editorConfiguration = {
	// toolbar plugins
}

type EditorType = {
	initialData: any,
	onChange: (data: any) => void;
}

function CK5Editor({ initialData, onChange }: EditorType) {
	return (
		<>
			<CKEditor
				editor={ClassicEditor}
				config={editorConfiguration}
				data={initialData}
				onChange={(event: any, editor: any) => {
					const data = editor.getData();
					onChange(data)
				}}
			/>

		</>
	)
}
export default CK5Editor;