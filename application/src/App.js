import React from 'react';
import './App.css';
import EditableForms from './Forms/EditableForm';

function App() {
	return (
		<div className='App'>
			<EditableForms
				defaults={true}
				defaultValues={['sad', 'hello', 'asdqwjdkn']}
				onSubmit={() => {
					console.log('i ran');
				}}
				data={{ sad: 'hello', hello: 'world' }}
			/>
		</div>
	);
}

export default App;
