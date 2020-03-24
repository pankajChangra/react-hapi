import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "../../store/actions/auth.act";
import { Redirect } from "react-router-dom";

interface IState {
    first_name: string;
    last_name: string;
    email: any;
    password: any;
    registerNameError: boolean;
    registerEmailError: boolean;
    registerPasswordError: boolean;
    registerErrorMsg: string
    redirect: boolean
}

interface IPros {
    onAuth? : any,
    loading: boolean,
    email: string,
    registerError: boolean
}

class Register extends Component<IPros, IState>{
    constructor(props:IPros) {
        super(props)
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            registerNameError: false,
            registerEmailError: false,
            registerPasswordError: false,
            registerErrorMsg: "",
            redirect: false
        }
    }

    onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let  updateState:any = {
            [e.target.name] : e.target.value
        }
        this.setState(updateState);
    }


    errorMessageReset = () => {
        this.setState({
            registerNameError: false,
            registerEmailError: false,
            registerPasswordError: false,
        })
    }
    
    onSubmit = () => {

        let {first_name, last_name, email, password} = this.state

        if(first_name === ""){
            this.setState({
                registerNameError: true,
                registerErrorMsg: "This field is required"
            })
            return false;
        }

        if(email === ""){
            this.setState({
                registerEmailError: true,
                registerErrorMsg: "This field is required"
            })
            return false;
        }

        if(!email.includes("@")) {
            this.setState({
                registerErrorMsg: "Please enter valid email!",
                registerEmailError: true,
            });
      
            return false;
        }

        if(password === ""){
            this.setState({
                registerPasswordError: true,
                registerErrorMsg: "This field is required"
            })
            return false;
        }

        if(password.length < 6) {
            this.setState({
                registerPasswordError: true,
                registerErrorMsg: "Password must be at least 6 character long"
            })
        }

        const data:any = {
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: password
        }

        this.props.onAuth(data, 'register');
    }

    componentDidUpdate = (prevProps: any) => {
        if(prevProps.email !== this.props.email) {
            if(this.props.email !== null && this.props.email !== "")
            this.setState({
                redirect: true
            })
        }
    }

    render () {
        let {registerNameError, registerEmailError, registerErrorMsg, registerPasswordError, redirect} =this.state
        let { from } = { from: { pathname: "/login" } };
        if (redirect) return <Redirect to={from} />;
        return (
            <React.Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 mt-5 mx-auto">
                            {this.props.registerError !== null ? <div className="alert alert-danger" role="alert">
                            {this.props.registerError}
                            </div> : null}
                            <form noValidate onSubmit={
                                (event:any)=> {
                                    event.preventDefault(); this.onSubmit()
                                }}>
                                <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                                <div className="form-group">
                            {!registerNameError ? <label htmlFor="first_name">First Name<span className="errorMsg">*</span></label> : <span className="errorMsg">{registerErrorMsg}</span> }
                                    <input type="text"
                                        className="form-control"
                                        name="first_name"
                                        placeholder="Enter Your First Name"
                                        value={this.state.first_name}
                                        onClick={this.errorMessageReset}
                                        onChange={this.onHandleChange}
                                    />
                                </div>
                                <div className="form-group">
                                <label htmlFor="last_name">Last Name</label>
                                    <input type="text"
                                        className="form-control"
                                        name="last_name"
                                        placeholder="Enter Your Last Name"
                                        value={this.state.last_name}
                                        onClick={this.errorMessageReset}
                                        onChange={this.onHandleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    {!registerEmailError ? <label htmlFor="email">Email Address<span className="errorMsg">*</span></label> : <span className="errorMsg">{registerErrorMsg}</span> }
                                    <input type="email"
                                        className="form-control"
                                        name="email"
                                        placeholder="Enter Your Email"
                                        value={this.state.email}
                                        onClick={this.errorMessageReset}
                                        onChange={this.onHandleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    {!registerPasswordError ? <label htmlFor="password">Password<span className="errorMsg">*</span></label> : <span className="errorMsg">{registerErrorMsg}</span> }
                                    <input type="password"
                                        className="form-control"
                                        name="password"
                                        placeholder="Enter Your Password"
                                        value={this.state.password}
                                        onClick={this.errorMessageReset}
                                        onChange={this.onHandleChange}
                                    />
                                </div>
                                {localStorage.usertoken ? (
                                <button type="submit"
                                    className="btn btn-lg btn-primary btn-block" disabled={true} >
                                    Register
                                </button>
                                ) : (
                                    this.props.loading === true ? <button className="btn btn-lg btn-primary btn-block" type="button" disabled={true}>
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                <span className="sr-only">Loading...</span>
                                </button> : <button type="submit" className="btn btn-lg btn-primary btn-block" >
                                        Register
                                    </button>  
                                )}
                            </form><br />
                            Already have an account? <a href="/login">Sign in</a>
                        </div>
                    </div>
                    <div className="top"></div>
                </div>
            </React.Fragment>
        )
    }
}


const mapStateToProps = (state: any) => {
    return {
      loading: state.auth.loading,
      error: state.auth.error,
      registerError: state.auth.registerError,
      email: state.auth.registerResp
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
      onAuth: (data: any, payload: any) => dispatch(actions.authSignup(data, payload))
    };
};

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Register);