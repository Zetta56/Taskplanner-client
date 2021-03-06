import React from "react";
import {reduxForm, Field} from "redux-form";
import {connect} from "react-redux";
import {createUser} from "../../actions";
import "./UserForm.css";

class Register extends React.Component {
	onFormSubmit = ({email, username, password}) => {
		const formValues = {
			email: email,
			username: username,
			password: password
		}
		
		this.props.createUser(formValues);
	};

	renderError = ({touched, error}) => {
		if(touched && error) {
			return <div className="ui middle red pointing label">{error}</div>
		};
	};

	renderInput = ({input, placeholder, inputType, meta}) => {
		const error = meta.error && meta.touched ? "error " : "";
		
		return (
			<React.Fragment>
				<input {...input}  type={inputType} placeholder={placeholder} className={`${error} field`} />
				{this.renderError(meta)}
			</React.Fragment>
		);
	};
	
	render() {
		return (
			<div className="userForm ui one column stackable grid">
				<div className="eight wide column">
					<h2>Create An Account</h2>
					<form className="ui form" onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
						<Field name="email" component={this.renderInput} placeholder="Email" inputType="text" />
						<Field name="username" component={this.renderInput} placeholder="Username" inputType="text" />
						<Field name="password" component={this.renderInput} placeholder="Password" inputType="password" />
						<Field name="confirmPassword" component={this.renderInput} placeholder="Confirm Password" inputType="password" />
						<button className="ui blue button" id="submitButton">Submit</button>
					</form>
				</div>
			</div>
		);
	};
};

//Redux-form uses validate function's object to render specific errors
const validate = ({email, username, password, confirmPassword}) => {
	const err = {};
	const emailRegex = RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g);
	const passRegex = RegExp(/^(?=.*\d)(?=.*[\W])(?=.*[a-zA-Z]).{6,}$/g);
	
	if(!emailRegex.test(email)) {
		err.email = "Email must be in a valid format";
	};
	
	if(!email) {
		err.email = "You must enter an email";
	};
	
	if(!username) {
		err.username = "You must enter a username";
	};
	
	if(!passRegex.test(password)) {
		err.password = "Password must be 6+ characters long with 1+ number and special character";
	};
	
	if(!password) {
		err.password = "You must enter a password";
	};
	
	if(password !== confirmPassword) {
		err.confirmPassword = "Your password and confirmed password do not match"
	}
	
	if(!confirmPassword) {
		err.confirmPassword = "You must confirm your password";
	}
	
	return err;
};

const mapStateToProps = (state) => {
	return {users: state.users};
};

const formWrapped = reduxForm({
	form: "Register",
	validate: validate
})(Register);

export default connect(mapStateToProps, {createUser})(formWrapped);