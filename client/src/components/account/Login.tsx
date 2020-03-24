import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "../../store/actions/auth.act";
// import { GoogleLogin } from 'react-google-login';

interface IState {
    email: any;
    password: any;
    loginError: boolean;
    validationEmailError: boolean;
    validationPasswordError: boolean;
    validationMessage: string
}

interface IPros {
    onAuth? : any
    regEmail: string
    loginError: any
}

class Login extends Component<IPros, IState>{
    constructor(props: IPros) {
        super(props)
        this.state = {
            email: '',
            password: '',
            loginError: false,
            validationEmailError: false,
            validationPasswordError: false,
            validationMessage: '',
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.errorMessageReset = this.errorMessageReset.bind(this)
        // this.responseGoogle = this.responseGoogle.bind(this)
    }

    onChange (e: React.ChangeEvent<HTMLInputElement>) {
        let  updateState:any = {
            [e.target.name] : e.target.value
        }
        this.setState(updateState);
    }

    errorMessageReset = () => {
        this.setState({
            loginError: false,
        })
    }

    onSubmit() {

        let {email, password} = this.state
        
        if(email==="")
        {
            this.setState({
            validationEmailError:true,
            validationMessage:"Please enter the Email"
            });
            return false;
        }
        if(email!==null && !email.includes('@')){
            this.setState({
            validationEmailError:true,
            validationMessage:"Please enter the Valid Email"
            });
            return false;
        }

        if(password === "") {
            this.setState({
                validationPasswordError: true,
                validationMessage: "Please enter password field"
            })
            return false;
        }

        let data = {
            email: email,
            password: password
        }
        
        this.props.onAuth(data, 'login');
    }

    componentDidUpdate = (prevProps: any) => {
        if(prevProps.regEmail !== this.props.regEmail){
            if(this.props.regEmail !== null && this.props.regEmail) {
                console.log(this.props.regEmail)
            }
        }

        if(prevProps.loginError !== this.props.loginError) {

        }
    }

    // responseGoogle = (response) => {
    //     let data = {
    //         oauth_provider: response.Zi.idpId,
    //         oauth_uid: response.profileObj.googleId,
    //         first_name: response.profileObj.givenName,
    //         last_name: response.profileObj.familyName,
    //         email: response.profileObj.email,
    //         token:	response.Zi.access_token,
    //         img_url: response.profileObj.imageUrl
    //     }
    //     this.props.gLogin(data, 'Login')
    // }
    
    render () {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        {this.props.regEmail !== null && this.props.regEmail ? <div className="alert alert-success" role="alert">
                            Account successfully created! Please sign-in into your account 
                        </div>: null}
                        {this.props.loginError !== null && this.props.loginError ? <div className="alert alert-danger" role="alert">{this.props.loginError}</div>: null}
                        <form noValidate onSubmit={(event:any) => {event.preventDefault(); this.onSubmit()}}>
                            <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input type="email"
                                    className="form-control"
                                    name="email"
                                    placeholder="Enter Email"
                                    value={this.state.email}
                                    onClick={this.errorMessageReset}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder="Enter Password"
                                    value={this.state.password}
                                    onClick={this.errorMessageReset}
                                    onChange={this.onChange}
                                />
                            </div>
                            {localStorage.usertoken ? (<button type="submit" disabled={true} className="btn btn-lg btn-primary btn-block">
                                Sign in
                                </button>
                             ) : ( 
                                <button type="submit" className="btn btn-lg btn-primary btn-block">
                                Sign in
                                </button>
                            )}
                            <br />
                            <h4 className="text-center">OR</h4>
                            {/* <button class="loginBtn loginBtn--google text-center">
                                Login with Google
                            </button> */}


                            {/* <GoogleLogin
                                clientId="160435735197-r00at7f96h9nnpj9dffgo243c4t4u13o.apps.googleusercontent.com"
                                buttonText="Login With Google"
                                onSuccess={this.responseGoogle}
                                onFailure={this.responseGoogle}
                                cookiePolicy={'single_host_origin'}
                                className="button-width"
                            /> */}
                        </form><br />
                        <p>Need to create an account ? <a href="/register">Register Now</a></p>
                    </div>
                </div>
                <div className="top"></div>
            </div>
        )
    }
}

const mapStateToProps = (state:any) => {
    return {
        token: state.auth.token,
        loading: state.auth.loading,
        error: state.auth.error,
        regEmail: state.auth.registerResp,
        loginError: state.auth.loginError
    };
};
  
  const mapDispatchToProps = (dispatch:any) => {
    return {
      onAuth: (data: any, payload: any) => dispatch(actions.authLogin(data, payload)),
    //   gLogin: (data,requestFrom) => dispatch(actions.googleAuthSignup(data,requestFrom))
    };
};
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
    )(Login);