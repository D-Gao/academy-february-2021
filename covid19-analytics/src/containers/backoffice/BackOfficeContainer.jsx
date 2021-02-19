import React, { useState } from "react";
import "./BackofficeContainer.scss";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from 'primereact/button';
import {connect} from 'react-redux';
import {startLogin} from "../../store/actions/auth";
import BackdropComponent from "../../components/BackdropComponent/BackdropComponent";

const BackOfficeContainer = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = () => {
    props.startLogin(username, password);
  }


  return (
          <>  {props.loading && <BackdropComponent/>}

    <div className="row justify-content-center align-items-center login-container">
      <div className="col-6 login-wrapper">
        <div className="row justify-content-center card-login pb-2 pt-2">
          <div className="col-10">
            <div className="row">
              <h1 className="col-12 card-title">Login</h1>
              <div className={"col-12 p-inputgroup p-md-2"}>
                <span className="p-inputgroup-addon">
                  <i className="pi pi-user" />
                </span>
                <InputText
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className={"col-12 p-inputgroup p-md-2"}>
                <span className="p-float-label">
                  <Password
                    id={"password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </span>
              </div>
              <div className={"col-12 p-md-2 button"}>
              <Button 
                label="Submit" 
                onClick={handleClick} 
                disabled={username === "" && password === ""}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

const mapStateToProps = state => ({
  loading: state.authReducer.loading
});

const mapDispatchToProps = dispatch => ({
  startLogin: (username, password) => dispatch(startLogin(username, password)),
});

export default connect(mapStateToProps,
  mapDispatchToProps) (BackOfficeContainer);

