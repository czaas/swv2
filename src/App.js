import * as React from "react";
import { BrowserRouter, Route, Link, Switch, Redirect } from "react-router-dom";
import "./App.css";
import { parentLoggedInState } from "./data/initial-state";
import EditChildProfile from "./components/EditChildProfile";
import WordList from "./components/List";
import CreateChildProfile from "./components/CreateChildProfile";

const Nav = () => (
	<Route
		path="/*"
		render={({ match }) => {
			// As long not home page
			if (!/\/./.test(match.url)) {
				return (
					<ul>
						<li>
							<Link to="/dashboard">Login</Link>
						</li>
					</ul>
				);
			}
			return (
				<ul>
					<li>
						<Link to="/">Logout</Link>
					</li>
					<li>
						<Link to="/dashboard">Dashboard</Link>
					</li>
				</ul>
			);
		}}
	/>
);

const ChildDashboard = ({ currentChild, match }) => (
	<div>
		<h1>{currentChild.name}'s Dashboard</h1>

		<p>
			<Link to={`${match.url}/current-list`}>
				Start next/current list
			</Link>
		</p>
		<p>
			<button>Start practice list</button>
		</p>
		<p>
			<button>Pop Quiz</button>
		</p>
		<p>
			<Link to={`/njdfkslaf`}>Link goes nowhere</Link>
		</p>
		<p>
			<Link to={`${match.url}/edit`}>Edit</Link>
		</p>
	</div>
);

class App extends React.Component {
	state = {
		...parentLoggedInState,
	};
	editChildProfile = (updatedProfile, deleteChild) => {
		const children = this.state.children.filter(
			child => child.id !== updatedProfile.id
		);

		if (deleteChild) {
			this.setState({
				children: [...children],
			});
		} else {
			this.setState({
				children: [...children, updatedProfile],
			});
		}
	};
	handleCreateChildProfile = newChildProfile => {
		this.setState({
			children: [...this.state.children, newChildProfile],
		});
	};
	render() {
		return (
			<BrowserRouter>
				<div>
					<Nav />
					<Switch>
						<Route path="/" exact />
						<Route
							path={`/add-child`}
							render={() => (
								<CreateChildProfile
									onCreate={this.handleCreateChildProfile}
								/>
							)}
						/>
						<Route
							path="/child/:id"
							render={props => {
								const { match } = props;
								const currentChildId = match.params.id;
								const currentChild = this.state.children.find(
									child => child.id === currentChildId
								);

								if (!currentChild) {
									return <Redirect to="/dashboard" />;
								}

								return (
									<Switch>
										<Route
											path={`${match.url}/edit`}
											render={() => (
												<EditChildProfile
													currentChild={currentChild}
													backLink={match.url}
													onEditChildProfile={
														this.editChildProfile
													}
													match={match}
												/>
											)}
										/>
										<Route
											path={`${match.url}/current-list`}
											render={() => (
												<WordList
													currentChild={currentChild}
													wordList={this.state.words}
													match={match}
													editChildProfile={
														this.editChildProfile
													}
												/>
											)}
										/>

										<Route
											render={() => (
												<ChildDashboard
													currentChild={currentChild}
													match={match}
												/>
											)}
										/>
									</Switch>
								);
							}}
						/>
						<Route
							exact
							path="/dashboard"
							render={() => (
								<div>
									Dashboard
									<ul>
										{this.state.children.map(child => (
											<li key={child.name}>
												<Link to={`/child/${child.id}`}>
													{child.name}
												</Link>
											</li>
										))}
										<li key={"add-child"}>
											<Link to="/add-child">
												Add Child
											</Link>
										</li>
									</ul>
								</div>
							)}
						/>
						<Route render={() => <div>404 You are lost</div>} />
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
