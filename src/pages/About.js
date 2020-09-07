import React from "react";

export const About = () => (
  <div className="jumbotron jumbotron-fluid">
    <div className="container">
      <h1 className="display-4">React додаток для задач.</h1>
      <p className="lead">Версія: 0.2</p>
      <p>Development stack:</p>
      <strong>
        React (hooks), react-router-dom, react-transition-group, sass,
        bootstrap, axios, firebase.{" "}
      </strong>
    </div>
    <hr />
    <div className="container">
      <p>Мене звати Юрій, я front-end розробник-початківець. </p>
      <hr />
      <p>На даний момент я посилено вивчаю React&Redux та JavaScript.</p>
      <p>Мої контакти:</p>
      <div className="flex-column">
        <div className="mb-2">
          <strong>Telegram:</strong> <span>@Velidoss</span>
        </div>
        <div className="mb-2">
          <strong>Електронна пошта:</strong> <span>velidoss11@gmail.com</span>
        </div>
      </div>
    </div>
  </div>
);
