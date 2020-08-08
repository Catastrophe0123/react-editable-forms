import React, { Component } from 'react';
import EditLabel from './EditLabel';

export class EditableForm extends Component {
	state = { keys: null, values: null };

	// we have the data
	// key: value
	// key : label - editable
	//

	// props = {
	// default ?: boolean
	// defaultValues ?: Array of Strings,
	// data : data object
	// onSubmit : Function
	// }

	componentDidMount = () => {
		// we have the defaults and defaultValues as props
		// defaultValues = ["name", "age", "dob"]

		let { defaults, defaultValues } = this.props;
		let keys = Object.keys(this.props.data);
		let values = Object.values(this.props.data);
		if (defaults) {
			let len = defaultValues.length;
			keys = [...defaultValues, ...Object.keys(this.props.data)];
			defaultValues.forEach((e) => {
				values.push('');
			});
			values = [...values, ...Object.values(this.props.data)];
		}
		// sort the data and setstate
		this.setState({
			keys,
			values,
		});
	};

	displayData = () => {
		let len;
		// let len = 'ad';
		if (this.props.defaults) {
			len = this.props.defaultValues.length;
		} else {
			len = 0;
		}
		return (
			<div>
				{this.state.keys.map((el, id) => {
					return (
						<div
							className='justify-center text-center my-3 border-black border rounded-md'
							style={{ display: 'flex' }}>
							<EditLabel
								onChange={
									id >= len
										? (event) => {
												let val = event.target.value;
												this.setState((st) => {
													let keys = [...st.keys];
													keys[id] = val;
													return {
														...st,
														keys,
													};
												});
										  }
										: null
								}>
								{el}
							</EditLabel>{' '}
							:{' '}
							<EditLabel
								onChange={(event) => {
									let val = event.target.value;
									this.setState((st) => {
										let values = [...st.values];
										values[id] = val;
										return {
											...st,
											values,
										};
									});
								}}>
								{this.state.values[id]}
							</EditLabel>
						</div>
					);
				})}
			</div>
		);
	};

	onAddAnotherHandler = () => {
		// add another entry
		this.setState((st) => {
			return {
				keys: [...st.keys, ''],
				values: [...st.values, ''],
			};
		});
	};

	render() {
		return (
			<div className='text-center'>
				{this.state.keys && this.state.values && this.displayData()}
				<button
					className='text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-gray-800 active:bg-gray-700 uppercase text-sm shadow hover:shadow-lg'
					onClick={this.onAddAnotherHandler}>
					Add another value
				</button>
				<button
					className='text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-gray-800 active:bg-gray-700 uppercase text-sm shadow hover:shadow-lg'
					onClick={this.props.onSubmit.bind(
						this,
						this.state.keys,
						this.state.values
					)}>
					Submit
				</button>
			</div>
		);
	}
}

export default EditableForm;
