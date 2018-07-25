import * as React from "react";
import { Link, Redirect } from "react-router-dom";

class EditChildProfile extends React.Component {
	state = {
		redirectToDashboard: false,
	};
	handleDelete = e => {
		e.preventDefault();
		const { currentChild, onEditChildProfile } = this.props;

		const deletePrompt = prompt(
			`type in "${currentChild.name}" exactly to delete`
		);

		if (deletePrompt === currentChild.name) {
			onEditChildProfile(currentChild, true);
			this.setState({
				redirectToDashboard: true,
			});
		}
	};
	render() {
		const { currentChild, onEditChildProfile, backLink } = this.props;

		if (this.state.redirectToDashboard) {
			return <Redirect to="/dashboard" push={true} />;
		}

		return (
			<div>
				<Link to={backLink}>back</Link>
				<input
					defaultValue={currentChild.name}
					onChange={e => {
						onEditChildProfile({
							...currentChild,
							name: e.target.value,
						});
					}}
				/>
				<br />
				
				<button onClick={this.handleDelete}>DELETE</button>
			</div>
		);
	}
}

export default EditChildProfile;
