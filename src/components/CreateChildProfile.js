import * as React from "react";
import { Link, Redirect } from "react-router-dom";
var shortid = require("shortid");

class CreateChildProfile extends React.Component {
	state = {
		name: "",
		redirectToChildProfile: false,
		id: shortid.generate(),
	};
	handleAdd = () => {
		const { name, id } = this.state;
		this.props
			.onCreate({
				name,
				id,
				complete: [],
			})
			.then(() => {
				this.setState({
					redirectToChildProfile: true,
				});
			});
	};
	render() {
		const {} = this.props;

		if (this.state.redirectToChildProfile) {
			return <Redirect to={`/child/${this.state.id}`} push={true} />;
		}

		return (
			<div>
				<Link to={"/dashboard"}>back</Link>
				<input
					value={this.state.name}
					onChange={e => {
						this.setState({
							name: e.target.value,
						});
					}}
				/>
				<br />

				<button
					onClick={this.handleAdd}
					disabled={this.state.name.trim().length === 0}
				>
					Add
				</button>
			</div>
		);
	}
}

export default CreateChildProfile;
